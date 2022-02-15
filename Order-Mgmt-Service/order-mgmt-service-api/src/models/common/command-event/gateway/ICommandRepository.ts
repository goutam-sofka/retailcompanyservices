import { ICommand } from "../ICommand";

export interface ICommandRepository {
     sendCommand(command:ICommand);
     
}