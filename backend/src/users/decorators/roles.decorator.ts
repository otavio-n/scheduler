import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { UserRoles } from '../dto/user-roles.enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: UserRoles[]): CustomDecorator<string> =>
  SetMetadata(ROLES_KEY, roles);
