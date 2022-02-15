import { IDomainEvent } from "../IDomainEvent";

export interface IDomainEventRepository {
     raiseEvent(domainEvent:IDomainEvent);
}