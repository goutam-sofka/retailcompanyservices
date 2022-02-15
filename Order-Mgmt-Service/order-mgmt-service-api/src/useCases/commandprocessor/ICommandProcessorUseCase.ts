import { ICommand } from "../../models/common/command-event/ICommand";
import { IDomainEvent } from "../../models/common/command-event/IDomainEvent";

export interface ICommandProcessorUseCase{
   hasCommandAlreadyBeenProcessed(command:ICommand):Promise<boolean>;
   registerCommandAsProcessed(command:ICommand);
}