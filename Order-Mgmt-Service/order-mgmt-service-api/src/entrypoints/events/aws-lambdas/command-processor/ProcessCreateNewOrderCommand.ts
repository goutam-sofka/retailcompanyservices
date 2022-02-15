import { SQSEvent, SQSRecord } from "aws-lambda";
import { ICommand } from "../../../../models/common/command-event/ICommand";
import * as UTIL from "../../../../utils";
import {IOrderManagementUseCase} from "../../../../useCases/ordermanagement/IOrderManagementUseCase";
import {OrderManagementUseCase} from "../../../../useCases/ordermanagement/OrderManagementUseCase";



exports.handler = async (event: SQSEvent) => {
    await UTIL.HandlerRequestUtil.tryCatchWrapper(async () => {
      const allCommands: ICommand[] = await getSanitizedData(event);
      const orderMgmtUseCase: IOrderManagementUseCase =new OrderManagementUseCase();
      
      
      for (const eachCommand of allCommands) {
        
        UTIL.RecordKeeperUtil.record(
          "ProcessCreateNewOrderCommand.handler - Before Processing a command for New Order",
          eachCommand,
          eachCommand.id,
          false
        );
        await orderMgmtUseCase.processNewOrderCommand(eachCommand);

        //now register the command
        await 
        UTIL.RecordKeeperUtil.record(
          "ProcessCreateNewOrderCommand.handler - After Processing a command for New Order",
          eachCommand,
          eachCommand.id,
          false
        );
      }
    });
  };
  
  async function getSanitizedData(event: SQSEvent): Promise<ICommand[]> {
    return event.Records.map((r: SQSRecord) => {
      const body = r.body ? JSON.parse(r.body) : {};
      return body;
    });
  }