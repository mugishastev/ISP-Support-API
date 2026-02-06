import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { Priority } from '../../common/enums/priority.enum';

@InputType()
export class CreateTicketInput {
    @Field()
    @IsNotEmpty()
    description: string;

    @Field(() => Priority)
    @IsEnum(Priority)
    priority: Priority;

    @Field()
    @IsNotEmpty()
    customerId: string;
}
