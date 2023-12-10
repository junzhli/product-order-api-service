import {SetMetadata} from '@nestjs/common';

export enum Role {
    Manager = '0',
    Customer = '1',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
