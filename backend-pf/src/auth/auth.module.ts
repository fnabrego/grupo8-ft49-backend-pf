import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersRepository } from 'src/users/users.repository';
import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { GoogleStrategy } from './strategies/google.strategy';
import { EmailRepository } from 'src/mails/emails.repository';
import { UsersModule } from 'src/users/users.module';
import { EmailModule } from 'src/mails/emails.module';

@Module({
  imports: [PassportModule, ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UsersRepository, GoogleStrategy, EmailRepository],
})
export class AuthModule {}
