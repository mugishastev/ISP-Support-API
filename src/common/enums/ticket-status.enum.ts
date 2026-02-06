import { registerEnumType } from '@nestjs/graphql';

export enum TicketStatus {
    OPEN = 'OPEN',
    IN_PROGRESS = 'IN_PROGRESS',
    RESOLVED = 'RESOLVED',
    CLOSED = 'CLOSED',
}

registerEnumType(TicketStatus, {
    name: 'TicketStatus',
    description: 'Status of a support ticket',
});
