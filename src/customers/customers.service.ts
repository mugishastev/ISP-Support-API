import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCustomerInput } from './dto/create-customer.input';

@Injectable()
export class CustomersService {
    constructor(private prisma: PrismaService) { }

    async create(createCustomerInput: CreateCustomerInput) {
        const existingCustomer = await this.prisma.customer.findUnique({
            where: { phone: createCustomerInput.phone },
        });

        if (existingCustomer) {
            throw new ConflictException('Customer with this phone number already exists');
        }

        const { subscription, ...customerData } = createCustomerInput;

        return this.prisma.customer.create({
            data: {
                ...customerData,
                ...(subscription && {
                    subscription: {
                        create: subscription,
                    },
                }),
            },
            include: {
                subscription: true,
            },
        });
    }

    async findAll() {
        return this.prisma.customer.findMany({
            include: {
                subscription: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const customer = await this.prisma.customer.findUnique({
            where: { id },
            include: {
                subscription: true,
            },
        });

        if (!customer) {
            throw new NotFoundException(`Customer with ID ${id} not found`);
        }

        return customer;
    }

    async findByPhone(phone: string) {
        const customer = await this.prisma.customer.findUnique({
            where: { phone },
            include: {
                subscription: true,
            },
        });

        if (!customer) {
            throw new NotFoundException(`Customer with phone ${phone} not found`);
        }

        return customer;
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.customer.delete({
            where: { id },
        });
    }
}
