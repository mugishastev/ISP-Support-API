import { Resolver, Query, Mutation, Args, Subscription } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { Ticket } from './models/ticket.model';
import { CreateTicketInput } from './dto/create-ticket.input';
import { AssignTicketInput } from './dto/assign-ticket.input';
import { UpdateTicketStatusInput } from './dto/update-ticket-status.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { TicketSubscription } from './subscriptions/ticket.subscription';

@Resolver(() => Ticket)
@UseGuards(GqlAuthGuard, RolesGuard)
export class TicketsResolver {
    constructor(
        private ticketsService: TicketsService,
        private ticketSubscription: TicketSubscription,
    ) { }

    @Mutation(() => Ticket)
    @Roles(Role.ADMIN, Role.AGENT)
    createTicket(@Args('createTicketInput') createTicketInput: CreateTicketInput) {
        return this.ticketsService.create(createTicketInput);
    }

    @Query(() => [Ticket], { name: 'tickets' })
    @Roles(Role.ADMIN, Role.AGENT, Role.TECHNICIAN)
    findAll() {
        return this.ticketsService.findAll();
    }

    @Query(() => Ticket, { name: 'ticket' })
    @Roles(Role.ADMIN, Role.AGENT, Role.TECHNICIAN)
    findOne(@Args('id') id: string) {
        return this.ticketsService.findOne(id);
    }

    @Mutation(() => Ticket)
    @Roles(Role.ADMIN, Role.AGENT)
    assignTicket(@Args('assignTicketInput') assignTicketInput: AssignTicketInput) {
        return this.ticketsService.assign(assignTicketInput);
    }

    @Mutation(() => Ticket)
    @Roles(Role.ADMIN, Role.AGENT, Role.TECHNICIAN)
    updateTicketStatus(@Args('updateTicketStatusInput') updateTicketStatusInput: UpdateTicketStatusInput) {
        return this.ticketsService.updateStatus(updateTicketStatusInput);
    }

    @Subscription(() => Ticket, {
        name: 'ticketUpdated',
    })
    ticketUpdated() {
        return this.ticketSubscription.subscribeToTicketUpdates();
    }
}
