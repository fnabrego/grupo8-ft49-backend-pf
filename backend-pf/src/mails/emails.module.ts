import { Module } from '@nestjs/common';
import { EmailService } from './emails.service';
import { EmailController } from './emails.controller';
import { EmailRepository } from './emails.repository';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [EmailController],
  providers: [EmailService, EmailRepository, UsersRepository],
})
export class EmailModule {}
