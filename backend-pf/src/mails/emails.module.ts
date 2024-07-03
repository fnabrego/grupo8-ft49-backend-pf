import { Module } from '@nestjs/common';
import { EmailService } from './emails.service';
import { EmailController } from './emails.controller';
import { EmailRepository } from './emails.repository';

@Module({
  providers: [EmailService, EmailRepository],
  controllers: [EmailController],
})
export class EmailModule {}
