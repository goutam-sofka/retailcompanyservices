import { Config } from "../../configuration/Config";
import {IOrderMgmtRepository} from "../../models/ordermanagement/gateway/IOrderMgmtRepository";
import { OrderInfo } from "../../models/ordermanagement/order/OrderInfo";
import AWS from "aws-sdk";
import { IOrderInventoryMgmtRepository } from "../../models/inventorymanagement/gateway/IOrderInventoryMgmtRepository";



const inventoryTable:string = Config.ORDER_CORE_DYNAMODB_INVENTORYTABLE;
const orderTable:string = Config.ORDER_CORE_DYNAMODB_ORDERTABLE;

//This is implemented in the form of a dynamoDB Adapter
export class CoreOrderInvMgmtDynamoDBAdapter implements IOrderInventoryMgmtRepository {
    private readonly DynamoDB: AWS.DynamoDB.DocumentClient;


    constructor() {
        this.DynamoDB= new AWS.DynamoDB.DocumentClient();
    }
    public async hasInventory(itemId: string, qty: number): Promise<boolean> {
        return Math.random() < 0.5;
    }
    public async reserveInventory(itemId: string, qty: number): Promise<boolean> {
        return true;
    }
    

}