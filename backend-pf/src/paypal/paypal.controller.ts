import { Controller, Post, Body } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  async createOrder(@Body('amount') amount: string) {
    const { orderId, approveUrl } = await this.paypalService.createOrder(amount);
    return { orderId, approveUrl };
  }

  @Post('capture-order')
  async captureOrder(@Body('orderId') orderId: string) {
    const captureData = await this.paypalService.captureOrder(orderId);
    return captureData;
  }
}