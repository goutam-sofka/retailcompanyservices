import { IDomainEventRepository } from "../../models";
import { IDomainEvent } from "../../models/common/command-event/IDomainEvent";
import AWS from "aws-sdk";
export class DomainEventAdapter implements IDomainEventRepository{
    private readonly eventbridge : AWS.EventBridge;

    constructor(){
        this.eventbridge=new AWS.EventBridge();
    }


    public async raiseEvent(domainEvent: IDomainEvent) {
        const params = {
            Entries: [
              {
                Detail: JSON.stringify(domainEvent),
                DetailType: domainEvent.name,
                Source: domainEvent.name,
              },
            ]
          };
        
          return await this.eventbridge.putEvents(params).promise();
    }
    
}