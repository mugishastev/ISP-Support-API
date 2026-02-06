import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { Role } from '../../common/enums/role.enum';

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty()
    fullName: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @Field(() => Role)
    @IsEnum(Role)
    role: Role;
}
