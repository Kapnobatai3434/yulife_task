import { SetMetadata } from '@nestjs/common';
import { UserType } from '../interfaces';

export const Roles = (...roles: UserType[]) => SetMetadata('roles', roles);
