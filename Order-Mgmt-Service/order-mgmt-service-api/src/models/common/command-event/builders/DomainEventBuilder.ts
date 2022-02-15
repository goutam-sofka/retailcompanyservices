import {IDomainEvent} from "../IDomainEvent";
import {ICommand} from "../ICommand";
import { OrderInfo } from "../../../ordermanagement/order/OrderInfo";


export class DomainEventBuilder{
    private readonly orderCommandObj : IDomainEvent;

    constructor(){
        this.orderCommandObj= {
            id:"",
            name:"",
            date:"",
            source:"",
            eventObj:null
        };
    }

    id(id:string) : DomainEventBuilder{
        this.orderCommandObj.id=id;
        return this;
    }

    name(name:string): DomainEventBuilder{
        this.orderCommandObj.name=name;
        return this;
    }

    source(source:string) : DomainEventBuilder{
        this.orderCommandObj.source=source;
        return this;
    }

    date(date:string): DomainEventBuilder{
        this.orderCommandObj.date=date;
        return this;
    }


    

    obj(obj:OrderInfo): DomainEventBuilder{
        this.orderCommandObj.eventObj=obj;
        return this;
    }

    build(): IDomainEvent {
        return this.orderCommandObj;
    }
    
}