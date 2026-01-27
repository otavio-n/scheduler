import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

import { IsEnum, IsString, IsStrongPassword } from 'class-validator';
import { UserRoles } from './user-roles.enum';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  name?: string;

  @IsString()
  @IsStrongPassword()
  password?: string;

  @IsEnum(UserRoles)
  role?: UserRoles;
}
