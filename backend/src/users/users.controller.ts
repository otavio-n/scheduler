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
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { ApiBody, ApiCookieAuth } from '@nestjs/swagger';
import { RolesGuard } from 'src/common/guards/roles.guard';
import { Roles } from './decorators/roles.decorator';
import { UserRoles } from './dto/user-roles.enum';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

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
  async create(
    @Body()
    userData: CreateUserDto,
  ): Promise<User> {
    return await this.usersService.create(userData);
  }

  @Get()
  @Roles(UserRoles.ADMIN)
  async findAll(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Get(':id')
  @Roles(UserRoles.ADMIN)
  async findOne(@Param('id') id: string): Promise<User> {
    return await this.usersService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRoles.ADMIN)
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        password: { type: 'string', example: '123456' },
        name: { type: 'string', example: 'Mario' },
        role: { type: 'string', example: 'ADMIN' },
      },
    },
  })
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return await this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRoles.ADMIN)
  async remove(@Param('id') id: string): Promise<User> {
    return await this.usersService.remove(+id);
  }
}
