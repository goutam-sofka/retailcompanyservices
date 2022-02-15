import * as MODEL from "../../models";
import AWS from "aws-sdk";
import { ICommandRepository } from "../../models/common/command-event/gateway/ICommandRepository";
import { ICommand } from "../../models/common/command-event/ICommand";
import {CommandRegister} from "../../configuration/CommandRegister";
import * as UTIL from "../../utils";
export class CommandAdapter implements ICommandRepository {
    private readonly sqsVar : AWS.SQS;

    constructor() {
        this.sqsVar=  new AWS.SQS();
    }
    public async sendCommand(command: ICommand) {
        const url=await CommandRegister.getCommandURL(command.name);
        UTIL.RecordKeeperUtil.record(
            "CommandAdapter.sendCommand - Sending a Command to url ="+url,
            command,
            command.id,
            false
        );
        
        return await this.sqsVar.sendMessage({
            MessageBody: JSON.stringify(command),
            QueueUrl: url
        }).promise();
        
    }

    
}