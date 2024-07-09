import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('paypal')
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) {}

  @Post('create-order')
  @UseGuards(AuthGuard)
  async createOrder(@Body('amount') amount: string) {
    const { orderId, approveUrl } = await this.paypalService.createOrder(amount);
    return { orderId, approveUrl };
  }

  @Post('capture-order')
  @UseGuards(AuthGuard)
  async captureOrder(@Body('orderId') orderId: string) {
    const captureData = await this.paypalService.captureOrder(orderId);
    return captureData;
  }
}