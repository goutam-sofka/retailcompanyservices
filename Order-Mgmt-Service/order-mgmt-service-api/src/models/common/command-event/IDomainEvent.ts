import { ICommand } from "./ICommand";

export interface IDomainEvent{
     id:string;//uuid of the event generated
     name:string;//name of the event
     source:string;//source of the event - name of the service
     date:string;//datetimestamp of the event
     eventObj:any;//this is the event payload of the business object
}