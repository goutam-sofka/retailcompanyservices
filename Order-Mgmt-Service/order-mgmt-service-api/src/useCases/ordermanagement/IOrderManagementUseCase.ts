import { OrderInfo } from "../../models/ordermanagement/order/OrderInfo";
import {ICommand} from "../../models/common/command-event/ICommand";
import {IDomainEvent} from "../../models/common/command-event/IDomainEvent";
export interface IOrderManagementUseCase {
    createNewOrderCommand(newOrderInfo: OrderInfo):Promise<string>;
    getOrder(orderId:string):Promise<OrderInfo>;
    processNewOrderCommand(createNewOrderCommand:ICommand):Promise<void>;
}
