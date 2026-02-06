import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTicketInput } from './dto/create-ticket.input';
import { AssignTicketInput } from './dto/assign-ticket.input';
import { UpdateTicketStatusInput } from './dto/update-ticket-status.input';
import { generateTicketNumber } from '../common/utils/ticket-number.util';
import { TicketStatus } from '../common/enums/ticket-status.enum';
import { TicketSubscription } from './subscriptions/ticket.subscription';

@Injectable()
export class TicketsService {
    constructor(
        private prisma: PrismaService,
        private ticketSubscription: TicketSubscription,
    ) { }

    async create(createTicketInput: CreateTicketInput) {
        const ticketNumber = generateTicketNumber();

        const ticket = await this.prisma.ticket.create({
            data: {
                ticketNumber,
                description: createTicketInput.description,
                priority: createTicketInput.priority,
                customerId: createTicketInput.customerId,
            },
            include: {
                customer: {
                    include: {
                        subscription: true,
                    },
                },
                assignedTo: true,
            },
        });

        await this.ticketSubscription.publishTicketUpdate(ticket);

        return ticket;
    }

    async findAll() {
        return this.prisma.ticket.findMany({
            include: {
                customer: {
                    include: {
                        subscription: true,
                    },
                },
                assignedTo: true,
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    async findOne(id: string) {
        const ticket = await this.prisma.ticket.findUnique({
            where: { id },
            include: {
                customer: {
                    include: {
                        subscription: true,
                    },
                },
                assignedTo: true,
                updates: {
                    include: {
                        user: true,
                    },
                    orderBy: { createdAt: 'desc' },
                },
            },
        });

        if (!ticket) {
            throw new NotFoundException(`Ticket with ID ${id} not found`);
        }

        return ticket;
    }

    async assign(assignTicketInput: AssignTicketInput) {
        await this.findOne(assignTicketInput.ticketId);

        const ticket = await this.prisma.ticket.update({
            where: { id: assignTicketInput.ticketId },
            data: {
                assignedToId: assignTicketInput.userId,
                status: TicketStatus.IN_PROGRESS,
            },
            include: {
                customer: {
                    include: {
                        subscription: true,
                    },
                },
                assignedTo: true,
            },
        });

        await this.ticketSubscription.publishTicketUpdate(ticket);

        return ticket;
    }

    async updateStatus(updateTicketStatusInput: UpdateTicketStatusInput) {
        const ticket = await this.findOne(updateTicketStatusInput.ticketId);

        const updateData: any = {
            status: updateTicketStatusInput.status,
        };

        if (updateTicketStatusInput.status === TicketStatus.RESOLVED) {
            updateData.resolvedAt = new Date();
        } else if (updateTicketStatusInput.status === TicketStatus.CLOSED) {
            updateData.closedAt = new Date();
        }

        const updatedTicket = await this.prisma.ticket.update({
            where: { id: updateTicketStatusInput.ticketId },
            data: updateData,
            include: {
                customer: {
                    include: {
                        subscription: true,
                    },
                },
                assignedTo: true,
            },
        });

        await this.prisma.ticketUpdate.create({
            data: {
                ticketId: updateTicketStatusInput.ticketId,
                userId: updateTicketStatusInput.userId,
                previousStatus: ticket.status,
                newStatus: updateTicketStatusInput.status,
                note: updateTicketStatusInput.note,
            },
        });

        await this.ticketSubscription.publishTicketUpdate(updatedTicket);

        return updatedTicket;
    }
}
