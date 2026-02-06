import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { TicketStatus } from '../../common/enums/ticket-status.enum';

@InputType()
export class UpdateTicketStatusInput {
    @Field()
    @IsNotEmpty()
    ticketId: string;

    @Field(() => TicketStatus)
    @IsEnum(TicketStatus)
    status: TicketStatus;

    @Field()
    @IsNotEmpty()
    note: string;

    @Field()
    @IsNotEmpty()
    userId: string;
}
