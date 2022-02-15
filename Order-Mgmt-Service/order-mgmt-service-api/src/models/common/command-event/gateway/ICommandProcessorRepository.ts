import { ICommand } from "../ICommand";

export interface ICommandProcessorRepository {
    get(command:ICommand);
    set(command:ICommand);
    
}