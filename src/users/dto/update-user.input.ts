import { InputType, Field, PartialType } from '@nestjs/graphql';
import { IsOptional, IsEnum } from 'class-validator';
import { CreateUserInput } from './create-user.input';
import { UserStatus } from '../../common/enums/user-status.enum';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field(() => UserStatus, { nullable: true })
    @IsOptional()
    @IsEnum(UserStatus)
    status?: UserStatus;
}
