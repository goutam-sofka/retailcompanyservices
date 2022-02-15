const environment:AppEnvironment = (process.env.ENVIRONMENT || "local") as AppEnvironment;
import dotenv from "dotenv";

dotenv.config({
    path: `${__dirname}/../environments/.env.${environment}`
});

export type AppEnvironment = "local" | "develop" | "qa" | "staging" | "production";

export class Config {
    static ENVIRONMENT:AppEnvironment = environment;
    static API_VERSION = "1.0"; 


    //CORE-ORDERMGMT-DYNAMODB-TABLES
    static ORDER_CORE_DYNAMODB_INVENTORYTABLE=process.env.ORDER_CORE_DYNAMODB_INVENTORYTABLE;
    static ORDER_CORE_DYNAMODB_ORDERTABLE= process.env.ORDER_CORE_DYNAMODB_ORDERTABLE;
    static COMMAND_TABLE= process.env.COMMAND_TABLE;

    //command urls
    static COMMAND_URL_CREATEORDER = process.env.COMMAND_URL_CREATEORDER;
    static COMMAND_URL_NOTPROCESSED_CREATEORDER=process.env.COMMAND_URL_NOTPROCESSED_CREATEORDER; 
}   
