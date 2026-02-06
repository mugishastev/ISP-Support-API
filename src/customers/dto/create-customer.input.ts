import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsOptional, IsPhoneNumber, IsNumber, IsBoolean } from 'class-validator';

@InputType()
class SubscriptionInput {
    @Field()
    @IsNotEmpty()
    planName: string;

    @Field(() => Int)
    @IsNumber()
    speedMbps: number;

    @Field(() => Float)
    @IsNumber()
    price: number;

    @Field({ defaultValue: true })
    @IsBoolean()
    isActive: boolean;
}

@InputType()
export class CreateCustomerInput {
    @Field()
    @IsNotEmpty()
    fullName: string;

    @Field()
    @IsNotEmpty()
    phone: string;

    @Field({ nullable: true })
    @IsOptional()
    @IsEmail()
    email?: string;

    @Field({ nullable: true })
    @IsOptional()
    nationalId?: string;

    @Field({ nullable: true })
    @IsOptional()
    address?: string;

    @Field(() => SubscriptionInput, { nullable: true })
    @IsOptional()
    subscription?: SubscriptionInput;
}
