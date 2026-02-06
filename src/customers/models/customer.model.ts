import { ObjectType, Field, ID, Float, Int } from '@nestjs/graphql';

@ObjectType()
class Subscription {
    @Field(() => ID)
    id: string;

    @Field()
    planName: string;

    @Field(() => Int)
    speedMbps: number;

    @Field(() => Float)
    price: number;

    @Field()
    isActive: boolean;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}

@ObjectType()
export class Customer {
    @Field(() => ID)
    id: string;

    @Field()
    fullName: string;

    @Field()
    phone: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    nationalId?: string;

    @Field({ nullable: true })
    address?: string;

    @Field(() => Subscription, { nullable: true })
    subscription?: Subscription;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
