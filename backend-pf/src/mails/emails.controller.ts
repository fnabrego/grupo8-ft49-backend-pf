import { Controller, Param, ParseUUIDPipe, Get } from '@nestjs/common';
import { EmailService } from './emails.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Email Sender')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('send/register/:id')
  async sendEmailRegister(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailRegister(id);
    return { message: 'Email enviado' };
  }
  @Get('send/order/:id')
  async sendEmailOrder(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailOrder(id);
    return { message: 'Email enviado' };
  }
  @Get('send/status/:id')
  async sendEmailStatus(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailStatus(id);
    return { message: 'Email enviado' };
  }
  @Get('send/updateUser/:id')
  async sendEmailUpdateUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailUpdateUser(id);
    return { message: 'Email enviado' };
  }
}
