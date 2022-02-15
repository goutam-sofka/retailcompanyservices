import { IOrderInventoryMgmtRepository } from "../../models/inventorymanagement/gateway/IOrderInventoryMgmtRepository";
import {IOrderInventoryMgmtUseCase} from "../inventorymanagement/IOrderInventoryMgmtUseCase";
import {CoreOrderInvMgmtDynamoDBAdapter} from "../../adapters/core-inventorymgmt-system/CoreOrderInvMgmtDynamoDBAdapter";


export class OrderInventoryMgmtUseCase implements IOrderInventoryMgmtUseCase{
    private readonly inventoryRepository:IOrderInventoryMgmtRepository;

    constructor(){
        this.inventoryRepository=new CoreOrderInvMgmtDynamoDBAdapter();
    }
    public async hasSufficientInventory(itemId: string, qty: number): Promise<boolean> {
       return await this.inventoryRepository.hasInventory(itemId,qty);
    }
    public async blockInventory(itemId: string, qty: number): Promise<boolean> {
       return await this.inventoryRepository.reserveInventory(itemId,qty);
    }

}