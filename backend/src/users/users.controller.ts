import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from 'generated/prisma/client';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRoles } from './dto/user-roles.enum';

@ApiCookieAuth('session-cookie')
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @Roles(UserRoles.ADMIN)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'email@email.com' },
        password: { type: 'string', example: '123456' },
        name: { type: 'string', example: 'Mario' },
        role: { type: 'string', example: 'ADMIN' },
      },
    },
  })
  create(
    @Body()
    userData: Prisma.UserCreateInput,
  ) {
    return this.usersService.create(userData);
  }

  @Get()
  @Roles(UserRoles.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN)
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
