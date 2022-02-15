import { ICommandProcessorRepository } from "../../models/common/command-event/gateway/ICommandProcessorRepository";
import { ICommand } from "../../models/common/command-event/ICommand";
import { Config } from "../../configuration/Config";
import AWS from "aws-sdk";

const commandTable:string = Config.COMMAND_TABLE;

export class CommandProcessorDBAdapter implements ICommandProcessorRepository {
    private readonly DynamoDB: AWS.DynamoDB.DocumentClient;

    constructor() {
        this.DynamoDB= new AWS.DynamoDB.DocumentClient();
    }
    
    
    public async get(command: ICommand) {
        const commandId = command.id;
        const dbParams = {
            TableName : commandTable,
            Key: {
                "id": commandId
            }
        };
        const data = await this.DynamoDB.get(dbParams).promise();
        return data.Item;
    }


    public async set(command: ICommand) {
        const dbParams ={
            TableName:commandTable,
            Item:command
        };
        return await this.DynamoDB.put(dbParams).promise();
        
    }

}