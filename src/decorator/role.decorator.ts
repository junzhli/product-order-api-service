import {SetMetadata} from '@nestjs/common';

export enum Role {
    Manager = '1',
    Customer = '2',
}

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
