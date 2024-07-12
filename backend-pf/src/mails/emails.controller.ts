import { Controller, Param, ParseUUIDPipe, Get } from '@nestjs/common';
import { EmailService } from './emails.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Email Sender')
@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}
  @Get('send/register/:id')
  @ApiOperation({ summary: 'Enviar un email al registrarse' })
  async sendEmailRegister(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailRegister(id);
    return { message: 'E-mail sent' };
  }
  @Get('send/order/:id')
  @ApiOperation({ summary: 'Enviar un email al crear una orden de envio' })
  async sendEmailOrder(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailOrder(id);
    return { message: 'E-mail sent' };
  }
  @Get('send/status/:id')
  @ApiOperation({ summary: 'Enviar un email al cambiar el estado de una orden' })
  async sendEmailStatus(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailStatus(id);
    return { message: 'E-mail sent' };
  }
  @Get('send/updateUser/:id')
  @ApiOperation({ summary: 'Enviar un email al cambiar la informacion del usuario' })
  async sendEmailUpdateUser(@Param('id', ParseUUIDPipe) id: string) {
    await this.emailService.sendEmailUpdateUser(id);
    return { message: 'E-mail sent' };
  }
}
