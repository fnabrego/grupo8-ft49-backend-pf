import { forwardRef, Module } from '@nestjs/common';
import { EmailService } from './emails.service';
import { EmailController } from './emails.controller';
import { EmailRepository } from './emails.repository';
import { UsersRepository } from 'src/users/users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UsersModule)],
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
  exports: [EmailRepository]
})
export class EmailModule {}
