import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as paypal from '@paypal/checkout-server-sdk';
import * as fs from 'fs';
import { FirebaseService } from '../firebase/firebase.service';
import { ReceiptsRepository } from '../receipts/receipts.repository';
import { PdfService } from './pdf/pdf.service';

@Injectable()
export class PaypalService {
  private paypalClient: paypal.core.PayPalHttpClient;

  constructor(
    private configService: ConfigService,
    private readonly pdfService: PdfService,
    private readonly firebaseService: FirebaseService,
    private readonly receiptRepository: ReceiptsRepository
  ) {
    const clientId = this.configService.get<string>('paypal.clientId');
    const clientSecret = this.configService.get<string>('paypal.clientSecret');
    const mode = this.configService.get<string>('paypal.mode') || 'sandbox';

    const environment = mode === 'sandbox'
      ? new paypal.core.SandboxEnvironment(clientId, clientSecret)
      : new paypal.core.LiveEnvironment(clientId, clientSecret);

    this.paypalClient = new paypal.core.PayPalHttpClient(environment);
  }

  async createOrder(amount: string): Promise<{ orderId: string, approveUrl: string }> {
    const request = new paypal.orders.OrdersCreateRequest();
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [{
        amount: {
          currency_code: 'USD',
          value: amount,
        },
      }],
    });

    try {
      const response = await this.paypalClient.execute(request);
      const orderId = response.result.id;
      const approveUrl = response.result.links.find(link => link.rel === 'approve').href;
      return { orderId, approveUrl };
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async captureOrder(orderId: string, id: string): Promise<any> {
    const request = new paypal.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
      const response = await this.paypalClient.execute(request);
      const data = response.result;
      console.log(data);

      const pdfFilePath = this.pdfService.generateReceipt(data);

      const pdfBuffer = fs.readFileSync(pdfFilePath);

      const fileName = `${data.id}.pdf`;
      const link = await this.firebaseService.uploadFile({ originalname: fileName, buffer: pdfBuffer });

      const receipt = await this.receiptRepository.getReceipt(id);
      if (!receipt) throw new NotFoundException(`Receipt with id:${id} not foud`);
      
      const loadReceipt = await this.receiptRepository.updateReceipt(id, link);
      if (!loadReceipt) throw new InternalServerErrorException('Fail load link Receipt');
      
      return response.result;
    } catch (error) {
      console.error('Error capturing order:', error);
      throw error;
    }
  }
}