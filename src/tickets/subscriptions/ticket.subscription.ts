import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class TicketSubscription {
    private pubSub: PubSub;

    constructor() {
        this.pubSub = new PubSub();
    }

    async publishTicketUpdate(ticket: any) {
        await this.pubSub.publish('ticketUpdated', { ticketUpdated: ticket });
    }

    subscribeToTicketUpdates() {
        return (this.pubSub as any).asyncIterator('ticketUpdated');
    }
}
