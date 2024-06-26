import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/users/users.entity';
import { UsersController } from 'src/users/users.controller';
import { UsersService } from 'src/users/users.service';
import { UsersRepository } from 'src/users/users.repository';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [],
  providers: [AuthService, UsersRepository],
})
export class AuthModule {}
