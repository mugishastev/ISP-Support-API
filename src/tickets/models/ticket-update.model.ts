import { ObjectType, Field, ID } from '@nestjs/graphql';
import { TicketStatus } from '../../common/enums/ticket-status.enum';
import { User } from '../../users/models/user.model';

@ObjectType()
export class TicketUpdate {
    @Field(() => ID)
    id: string;

    @Field()
    ticketId: string;

    @Field()
    userId: string;

    @Field(() => TicketStatus, { nullable: true })
    previousStatus?: TicketStatus;

    @Field(() => TicketStatus)
    newStatus: TicketStatus;

    @Field()
    note: string;

    @Field(() => User)
    user: User;

    @Field()
    createdAt: Date;
}
