import { Config } from "../../configuration/Config";
import {IOrderMgmtRepository} from "../../models/ordermanagement/gateway/IOrderMgmtRepository";
import { OrderInfo } from "../../models/ordermanagement/order/OrderInfo";
import AWS from "aws-sdk";



const orderTable:string = Config.ORDER_CORE_DYNAMODB_ORDERTABLE;

export class CoreOrderMgmtDynamoDBAdapter implements IOrderMgmtRepository {
    private readonly DynamoDB: AWS.DynamoDB.DocumentClient;


    constructor() {
        this.DynamoDB= new AWS.DynamoDB.DocumentClient();
    }
    public async getOrder(id: string) {
        const dbParams ={
            TableName:orderTable,
            Key: {
                "id": id
            }
        };
        const data = await this.DynamoDB.get(dbParams).promise();
        return data.Item;
    }
   
    
    public async createOrder(newOrderInfo: OrderInfo) {
        const dbParams ={
            TableName:orderTable,
            Item:newOrderInfo
        };
        return await this.DynamoDB.put(dbParams).promise();
    }

}