import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { UsersRepository } from 'src/users/users.repository';
import {
  html_order,
  html_register,
  html_status,
  html_updateUser,
  subject_order,
  subject_register,
  subject_status,
  subject_updateUser,
} from 'src/utils/defaultEmails';

@Injectable()
export class EmailRepository {
  private transporter;

  constructor(
    @Inject(forwardRef(() => UsersRepository))
    private readonly usersRepository: UsersRepository,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmailRegister(id: string) {
    const user = await this.usersRepository.getUser(id);

    if (!user)
      throw new NotFoundException(`User with id: ( ${id} ) not found.`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject_register,
      html: html_register,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error: any) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }

  async sendEmailOrder(id: string) {
    const user = await this.usersRepository.getUser(id);

    if (!user)
      throw new NotFoundException(`User with id: ( ${id} ) not found.`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject_order,
      html: html_order,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error: any) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }

  async sendEmailStatus(id: string) {
    const user = await this.usersRepository.getUser(id);

    if (!user)
      throw new NotFoundException(`User with id: ( ${id} ) not found.`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject_status,
      html: html_status,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error: any) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }

  async sendEmailUpdateUser(id: string) {
    const user = await this.usersRepository.getUser(id);

    if (!user)
      throw new NotFoundException(`User with id: ( ${id} ) not found.`);

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: subject_updateUser,
      html: html_updateUser,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error: any) {
      throw new Error(`Error sending email: ${error.message}`);
    }
  }
  async automatedPromotionalEmails() {
    const users = await this.usersRepository.getAllUsers();
    if (users.length === 0) throw new NotFoundException('There are no users');
    for (const user of users) {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: subject_updateUser,
        html: html_updateUser,
      };

      try {
        await this.transporter.sendMail(mailOptions);
      } catch (error: any) {
        throw new Error(`Error sending email: ${error.message}`);
      }
    }
  }
}
