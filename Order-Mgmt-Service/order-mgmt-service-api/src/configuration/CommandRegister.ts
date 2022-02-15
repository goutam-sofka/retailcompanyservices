import {Commands} from "../models/enums/Commands";
import {Config} from "../configuration/Config";

export abstract  class CommandRegister{
    private static readonly  targetURL:{key:string,value:string}[]=[
        {key:Commands.CREATE_ORDER,value:Config.COMMAND_URL_CREATEORDER},
        {key:Commands.REPLACE_ORDER,value:Config.COMMAND_URL_CREATEORDER}
    ];

    

    public static async getCommandURL(commandName:string):Promise<string>{
        return this.targetURL.filter(obj => obj.key == commandName)[0].value;
    }
}