import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Role } from '../../common/enums/role.enum';
import { UserStatus } from '../../common/enums/user-status.enum';

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    fullName: string;

    @Field()
    email: string;

    @Field(() => Role)
    role: Role;

    @Field(() => UserStatus)
    status: UserStatus;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}
