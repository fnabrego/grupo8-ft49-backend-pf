import { forwardRef, Module, OnModuleInit } from '@nestjs/common';
import { EmailService } from './emails.service';
import { EmailController } from './emails.controller';
import { EmailRepository } from './emails.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/users.entity';
import { UsersModule } from 'src/users/users.module';
import * as cron from 'node-cron';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => UsersModule)],
  controllers: [EmailController],
  providers: [EmailService, EmailRepository],
  exports: [EmailRepository],
})
export class EmailModule implements OnModuleInit {
  constructor(private readonly emailService: EmailService) {}
  async onModuleInit() {
    cron.schedule(process.env.EMAIL_TIME_AUTO, async () => {
      await this.emailService.automatedPromotionalEmails();
      console.log('Promotional emails sent');
    });
  }
}
