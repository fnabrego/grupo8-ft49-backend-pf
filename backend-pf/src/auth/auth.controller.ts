import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  GoogleLoginUserDto,
  LoginUserDto,
} from '../users/users.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { User } from 'src/users/users.entity';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Registrar una cuenta' })
  async signUp(@Body() user: CreateUserDto): Promise<Partial<User>> {
    return this.authService.signUp(user);
  }

  @Post('signin')
  @ApiOperation({ summary: 'Iniciar sesion' })
  signIn(@Body() credentials: LoginUserDto) {
    const { email, password } = credentials;
    return this.authService.signIn(email, password);
  }

  @Post('google/signin')
  @ApiOperation({ summary: 'Registrarse e iniciar sesion con google' })
  async googleSignIn(@Body() data: GoogleLoginUserDto) {
    return this.authService.googleSignIn(data);
  }
}
