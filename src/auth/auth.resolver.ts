import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginInput } from './dto/login.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class AuthResolver {
    constructor(private authService: AuthService) { }

    @Mutation(() => AuthResponse)
    async login(@Args('loginInput') loginInput: LoginInput) {
        return this.authService.login(loginInput);
    }

    @Mutation(() => TokenResponse)
    @UseGuards(AuthGuard('jwt-refresh'))
    async refreshToken(
        @Args('refreshTokenInput') refreshTokenInput: RefreshTokenInput,
        @Context() context: any,
    ) {
        const user = context.req.user;
        return this.authService.refreshTokens(user.id, user.email, user.role);
    }
}

// GraphQL Types
import { ObjectType, Field } from '@nestjs/graphql';
import { Role } from '../common/enums/role.enum';
import { UserStatus } from '../common/enums/user-status.enum';

@ObjectType()
class UserResponse {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field()
    fullName: string;

    @Field(() => Role)
    role: Role;

    @Field(() => UserStatus)
    status: UserStatus;
}

@ObjectType()
class AuthResponse {
    @Field(() => UserResponse)
    user: UserResponse;

    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;
}

@ObjectType()
class TokenResponse {
    @Field()
    accessToken: string;

    @Field()
    refreshToken: string;
}
