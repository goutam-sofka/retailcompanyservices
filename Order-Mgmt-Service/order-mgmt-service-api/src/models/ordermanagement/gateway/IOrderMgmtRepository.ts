import {OrderInfo} from "../order/OrderInfo";

export interface IOrderMgmtRepository{
    createOrder(newOrderInfo:OrderInfo);
    getOrder(id:string);
}