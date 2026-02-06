import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TicketStatus } from '../../common/enums/ticket-status.enum';
import { Priority } from '../../common/enums/priority.enum';
import { Customer } from '../../customers/models/customer.model';
import { User } from '../../users/models/user.model';

@ObjectType()
export class Ticket {
    @Field(() => ID)
    id: string;

    @Field()
    ticketNumber: string;

    @Field()
    description: string;

    @Field(() => TicketStatus)
    status: TicketStatus;

    @Field(() => Priority)
    priority: Priority;

    @Field()
    customerId: string;

    @Field({ nullable: true })
    assignedToId?: string;

    @Field(() => Customer)
    customer: Customer;

    @Field(() => User, { nullable: true })
    assignedTo?: User;

    @Field()
    openedAt: Date;

    @Field({ nullable: true })
    resolvedAt?: Date;

    @Field({ nullable: true })
    closedAt?: Date;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
