import { Injectable } from '@nestjs/common';
import { EmailRepository } from './emails.repository';

@Injectable()
export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendMail(to: string, subject: string, text: string, html: string) {
    return this.emailRepository.sendMail(to, subject, text, html);
  }
}
