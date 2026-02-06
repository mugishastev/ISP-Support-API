import { registerEnumType } from '@nestjs/graphql';

export enum Role {
    ADMIN = 'ADMIN',
    AGENT = 'AGENT',
    TECHNICIAN = 'TECHNICIAN',
}

registerEnumType(Role, {
    name: 'Role',
    description: 'User role in the system',
});
