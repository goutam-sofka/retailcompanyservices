

import { PaymentInfo } from "./PaymentInfo";
import { ShippingInfo } from "./ShippingInfo";
import { ShipperInfo } from "./ShipperInfo";
import { Channel } from "./Channel";
import { CustomerInfo } from "./CustomerInfo";
import { OrderItemInfo } from "./OrderItemInfo";
export class OrderInfo{
    public id:string;
    public date:string;
    public status:string;//this is the overall status of the order
    public placedFrom:Channel;//which channel
    public placedBy:CustomerInfo;//who made the purchase
    public billTo:PaymentInfo;//payment
    public shipTo:ShippingInfo;//where to ship 
    public shipBy:ShipperInfo;//who will ship
    public items:OrderItemInfo[];//list of items
}
