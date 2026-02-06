import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class AssignTicketInput {
    @Field()
    @IsNotEmpty()
    ticketId: string;

    @Field()
    @IsNotEmpty()
    userId: string;
}
