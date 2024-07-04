import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Any } from 'typeorm';

@Injectable()
export class EmailRepository {
  private transporter;

  constructor() {
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

  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
      html,
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      return info;
    } catch (error: any) {
      throw new Error(`Error al enviar el correo: ${error.message}`);
    }
  }
}
