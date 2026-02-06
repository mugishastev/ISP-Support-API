import { registerEnumType } from '@nestjs/graphql';

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    SUSPENDED = 'SUSPENDED',
}

registerEnumType(UserStatus, {
    name: 'UserStatus',
    description: 'User account status',
});
