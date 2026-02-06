import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async create(createUserInput: CreateUserInput) {
        const existingUser = await this.prisma.user.findUnique({
            where: { email: createUserInput.email },
        });

        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }

        const hashedPassword = await bcrypt.hash(createUserInput.password, 10);

        return this.prisma.user.create({
            data: {
                ...createUserInput,
                password: hashedPassword,
            },
        });
    }

    async findAll() {
        return this.prisma.user.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return user;
    }

    async update(id: string, updateUserInput: UpdateUserInput) {
        await this.findOne(id);

        const updateData: any = { ...updateUserInput };

        if (updateUserInput.password) {
            updateData.password = await bcrypt.hash(updateUserInput.password, 10);
        }

        return this.prisma.user.update({
            where: { id },
            data: updateData,
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        return this.prisma.user.delete({
            where: { id },
        });
    }
}
