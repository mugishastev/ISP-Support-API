import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { TicketSubscription } from './subscriptions/ticket.subscription';

@Module({
    providers: [TicketsService, TicketsResolver, TicketSubscription],
    exports: [TicketsService],
})
export class TicketsModule { }
