import { Injectable } from '@nestjs/common';
import { EmailRepository } from './emails.repository';

@Injectable()
export class EmailService {
  constructor(private readonly emailRepository: EmailRepository) {}

  async sendEmailRegister(id: string) {
    return this.emailRepository.sendEmailRegister(id);
  }
  async sendEmailOrder(id: string) {
    return this.emailRepository.sendEmailOrder(id);
  }
  async sendEmailStatus(id: string) {
    return this.emailRepository.sendEmailStatus(id);
  }
  async sendEmailUpdateUser(id: string) {
    return this.emailRepository.sendEmailUpdateUser(id);
  }
  async automatedPromotionalEmails() {
    return await this.emailRepository.automatedPromotionalEmails();
  }
  async sendReviewUsEmail(id: string) {
    return await this.emailRepository.sendReviewUsEmail(id);
  }
}
