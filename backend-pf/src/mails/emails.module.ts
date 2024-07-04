import { Module } from '@nestjs/common';
import { EmailService } from './emails.service';
import { EmailController } from './emails.controller';
import { EmailRepository } from './emails.repository';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [EmailService, EmailRepository, UsersRepository],
  controllers: [EmailController],
})
export class EmailModule {}
