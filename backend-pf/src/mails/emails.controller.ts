import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './emails.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email Sender')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Post('send')
  async sendEmail(
    @Body() to: string,
    subject: string,
    text: string,
    html: string,
  ) {
    await this.emailService.sendMail(to, subject, text, html);
    return { message: 'Email enviado' };
  }
}
