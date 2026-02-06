import { registerEnumType } from '@nestjs/graphql';

export enum Priority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
}

registerEnumType(Priority, {
    name: 'Priority',
    description: 'Priority level of a ticket',
});
