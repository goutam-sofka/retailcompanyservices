import { IOrderManagementUseCase } from "./IOrderManagementUseCase";
import {IOrderInventoryMgmtUseCase} from "../../useCases/inventorymanagement/IOrderInventoryMgmtUseCase";
import {IPaymentUseCase} from "../../useCases/payment/IPaymentUseCase";
import {PaymentUseCase} from "../../useCases/payment/PaymentUseCase";

import {OrderInventoryMgmtUseCase} from "../../useCases/inventorymanagement/OrderInventoryMgmtUseCase";
import { Config } from "../../configuration/Config";
import * as MODEL from "../../models";
import * as UTIL from "../../utils";
import { ICommand } from "../../models/common/command-event/ICommand";
import { IDomainEvent } from "../../models/common/command-event/IDomainEvent";
import { OrderInfo } from "../../models/ordermanagement/order/OrderInfo";
import { IOrderMgmtRepository } from "../../models/ordermanagement/gateway/IOrderMgmtRepository";
import { CoreOrderMgmtDynamoDBAdapter } from "../../adapters/core-ordermgmt-system/CoreOrderMgmtDynamoDBAdapter";
import { OrderItemInfo } from "../../models/ordermanagement/order/OrderItemInfo";
import { APIError } from "apilove";
import { ICommandRepository, IDomainEventRepository } from "../../models";
import { CommandAdapter } from "../../adapters/aws/CommandAdapter";
import { uuid } from "uuidv4";
import {CommandBuilder} from "../../models/common/command-event/builders/CommandBuilder";
import {DomainEventBuilder} from "../../models/common/command-event/builders/DomainEventBuilder";
import {Commands} from "../../models/enums/Commands";
import {OrderStatus} from "../../models/enums/order/OrderStatus";
import { ICommandProcessorUseCase } from "../commandprocessor/ICommandProcessorUseCase";
import {CommandProcessorUseCase} from "../commandprocessor/CommandProcessorUseCase";
import { DomainEvents } from "../../models/enums/DomainEvents";
import { DomainEventAdapter } from "../../adapters/aws/DomainEventAdapter";

export class OrderManagementUseCase implements IOrderManagementUseCase  {
    private readonly coreOrderMgmtRepository: IOrderMgmtRepository; 
    private readonly commandRepository: ICommandRepository;
    private readonly domainEventRepository: IDomainEventRepository;

    //child or dependent use cases
    private readonly inventorymgmtUseCase : IOrderInventoryMgmtUseCase;
    private readonly paymentUseCase: IPaymentUseCase;
    private readonly commandProcessorUseCase : ICommandProcessorUseCase;

    //constructor
    constructor() { 
        this.coreOrderMgmtRepository=new CoreOrderMgmtDynamoDBAdapter();
        this.commandRepository=new CommandAdapter();
        this.domainEventRepository = new DomainEventAdapter();

        this.inventorymgmtUseCase=new OrderInventoryMgmtUseCase();
        this.paymentUseCase=new PaymentUseCase();
        this.commandProcessorUseCase = new CommandProcessorUseCase();
    }
    
    
    public async getOrder(orderId: string): Promise<OrderInfo> {
      const order:OrderInfo = await this.coreOrderMgmtRepository.getOrder(orderId);
      return order;
    }



    //Generates a New Order Create Command
    public async createNewOrderCommand(newOrderInfo: OrderInfo): Promise<string> {
       const allItems : OrderItemInfo[] = newOrderInfo.items;
       //simulation of reception of Orders
       
       
       //check the inventory and reserve/block it
       for(const eachItem of allItems){
           const isValidAndReserved:boolean=await this.inventorymgmtUseCase.hasSufficientInventory(eachItem.id,eachItem.qty);
           if(!isValidAndReserved){
            UTIL.RecordKeeperUtil.record(
                "OrderManagementUseCase.createNewOrderCommand - Not sufficient stocks available for the given item ",
                eachItem,
                eachItem.id,
                true
              );
            throw APIError.createAPIFriendlyError(
                "System does not have sufficient inventory",
                400
              );
           }
           const wasProperlyReserved:boolean=await this.inventorymgmtUseCase.blockInventory(eachItem.desc,eachItem.qty);
           if(!wasProperlyReserved){
            throw APIError.createAPIFriendlyError(
                "System failed to reserve inventory before purchase",
                400
              );
           }
       }
       //validate payment here
       const isValidPmt = this.paymentUseCase.validatePayment(newOrderInfo.billTo.paymentId,newOrderInfo.billTo.paymentAmount);
       if(!isValidPmt){
        throw APIError.createAPIFriendlyError(
            "System failed to authorize the payment before purchase`",
            400
          );
        }
       


       //everything passed,now generate command object 
       const orderId = uuid();//this is auto generated uuid
       const newOrderCmd : ICommand = new CommandBuilder()
                                     .id(orderId)
                                     .name(Commands.CREATE_ORDER)
                                     .date(new Date().toLocaleString())
                                     .obj(newOrderInfo)
                                     .build();

       //sends the command                             
       await this.commandRepository.sendCommand(newOrderCmd);                              
       UTIL.RecordKeeperUtil.record(
        "OrderManagementUseCase.createNewOrderCommand - Sending to create a new Order with Command",
        newOrderCmd,
        orderId,
        false
      );
       return orderId;
    }




    public async processNewOrderCommand(newOrderCommand: ICommand): Promise<void> {
      try{
        const hasCommandBeenProcessed = await this.commandProcessorUseCase.hasCommandAlreadyBeenProcessed(newOrderCommand);
        const order : OrderInfo = newOrderCommand.obj;
        order["id"]             = newOrderCommand.id;
        order["status"]         = OrderStatus.NEW;
        if(!hasCommandBeenProcessed){
          
          UTIL.RecordKeeperUtil.record(
            "OrderManagementUseCase.processNewOrderCommand -  Processing a new command",
            newOrderCommand,
            newOrderCommand.id,
            false
          );
          //process the order object into the Core Mgmt System
          await this.coreOrderMgmtRepository.createOrder(order);
          //register the Command
          await this.commandProcessorUseCase.registerCommandAsProcessed(newOrderCommand);
          
          UTIL.RecordKeeperUtil.record(
            "OrderManagementUseCase.processNewOrderCommand -   Finished Processing a new command",
            newOrderCommand,
            newOrderCommand.id,
            false
          );
        }else{
          UTIL.RecordKeeperUtil.record(
            "OrderManagementUseCase.processNewOrderCommand -  Bypassing processing since this command was already processed",
            newOrderCommand,
            newOrderCommand.id,
            false
          );
        }

        //always raise the DomainEvent
        const orderCreatedDE : IDomainEvent = new DomainEventBuilder()
                                     .id(newOrderCommand.id) //same as that of command
                                     .name(DomainEvents.ORDER_CREATED)
                                     .date(new Date().toLocaleString())
                                     .obj(order)
                                     .source("ORDERMGMT-SERVICE-API")
                                     .build();
        
        await this.domainEventRepository.raiseEvent(orderCreatedDE);
        
        UTIL.RecordKeeperUtil.record(
          "OrderManagementUseCase.processNewOrderCommand -   New Domain Event is raised after processing the command ",
          orderCreatedDE,
          orderCreatedDE.id,
          false
        );
      }catch(error){
        UTIL.RecordKeeperUtil.record(
          "OrderManagementUseCase.processNewOrderCommand -  Error occurred while processing command",
          {newOrderCommand,error},
          newOrderCommand.id,
          true
        );
      }
    }
}