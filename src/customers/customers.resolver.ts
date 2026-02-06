import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CustomersService } from './customers.service';
import { Customer } from './models/customer.model';
import { CreateCustomerInput } from './dto/create-customer.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';

@Resolver(() => Customer)
@UseGuards(GqlAuthGuard, RolesGuard)
export class CustomersResolver {
    constructor(private customersService: CustomersService) { }

    @Mutation(() => Customer)
    @Roles(Role.ADMIN, Role.AGENT)
    createCustomer(@Args('createCustomerInput') createCustomerInput: CreateCustomerInput) {
        return this.customersService.create(createCustomerInput);
    }

    @Query(() => [Customer], { name: 'customers' })
    @Roles(Role.ADMIN, Role.AGENT, Role.TECHNICIAN)
    findAll() {
        return this.customersService.findAll();
    }

    @Query(() => Customer, { name: 'customer' })
    @Roles(Role.ADMIN, Role.AGENT, Role.TECHNICIAN)
    findOne(@Args('id') id: string) {
        return this.customersService.findOne(id);
    }

    @Query(() => Customer, { name: 'customerByPhone' })
    @Roles(Role.ADMIN, Role.AGENT, Role.TECHNICIAN)
    findByPhone(@Args('phone') phone: string) {
        return this.customersService.findByPhone(phone);
    }

    @Mutation(() => Customer)
    @Roles(Role.ADMIN)
    removeCustomer(@Args('id') id: string) {
        return this.customersService.remove(id);
    }
}
