import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody } from '@nestjs/swagger';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: { type: 'string', example: 'mario@email.com' },
        password: { type: 'string', example: '123456' },
      },
    },
  })
  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.login(dto);

    res.cookie('token', result.accessToken, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // true em produção
      maxAge: 1000 * 60 * 60 * 24,
      path: '/',
    });

    return { success: true, user: result.user };
  }
}
