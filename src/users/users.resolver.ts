import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Resolver(() => User)
@UseGuards(GqlAuthGuard, RolesGuard)
export class UsersResolver {
    constructor(private usersService: UsersService) { }

    @Mutation(() => User)
    @Roles(Role.ADMIN)
    createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
        return this.usersService.create(createUserInput);
    }

    @Query(() => [User], { name: 'users' })
    @Roles(Role.ADMIN)
    findAll() {
        return this.usersService.findAll();
    }

    @Query(() => User, { name: 'user' })
    @Roles(Role.ADMIN)
    findOne(@Args('id') id: string) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => User)
    @Roles(Role.ADMIN)
    updateUser(
        @Args('id') id: string,
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
    ) {
        return this.usersService.update(id, updateUserInput);
    }

    @Mutation(() => User)
    @Roles(Role.ADMIN)
    removeUser(@Args('id') id: string) {
        return this.usersService.remove(id);
    }
}
