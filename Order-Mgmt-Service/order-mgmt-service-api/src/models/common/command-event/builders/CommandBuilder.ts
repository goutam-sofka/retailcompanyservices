import {ICommand} from "../ICommand";
import {OrderInfo} from "../../../ordermanagement/order/OrderInfo";

export class CommandBuilder{
    private readonly orderCommandObj : ICommand;

    constructor(){
        this.orderCommandObj= {
            id:"",
            name:"",
            date:"",
            obj:""
        };
    }

    id(id:string) : CommandBuilder{
        this.orderCommandObj.id=id;
        return this;
    }

    name(name:string): CommandBuilder{
        this.orderCommandObj.name=name;
        return this;
    }

    date(date:string): CommandBuilder{
        this.orderCommandObj.date=date;
        return this;
    }


    

    obj(obj:OrderInfo): CommandBuilder{
        this.orderCommandObj.obj=obj;
        return this;
    }

    build(): ICommand {
        return this.orderCommandObj;
    }
    
}