import { ICommandProcessorRepository } from "../../models/common/command-event/gateway/ICommandProcessorRepository";
import { ICommand } from "../../models/common/command-event/ICommand";
import { ICommandProcessorUseCase } from "./ICommandProcessorUseCase";
import {CommandProcessorDBAdapter} from "../../adapters/database/CommandProcessorDBAdapter";

export class CommandProcessorUseCase implements ICommandProcessorUseCase{
    private readonly commandProcRepository:ICommandProcessorRepository;

    constructor(){
        this.commandProcRepository=new CommandProcessorDBAdapter();
    }
    
    public async registerCommandAsProcessed(command: ICommand) {
        return await this.commandProcRepository.set(command);
    }

    public async hasCommandAlreadyBeenProcessed(command: ICommand): Promise<boolean> {
        const commandFromDB : ICommand = await this.commandProcRepository.get(command);
        if(commandFromDB && commandFromDB.id){
            return true;
        }else{
            return false;
        }
    }
    
}