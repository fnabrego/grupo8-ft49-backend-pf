import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { PaypalService } from './paypal.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { CapturePaypalOrderDto, CreatePaypalOrderDto } from './paypal.dto';

@Controller('paypal')
@ApiTags('Paypal')
@ApiBearerAuth()
export class PaypalController {
  constructor(private readonly paypalService: PaypalService) { }

  @Post('create-order')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Crear una orden de compra en PayPal' })
  @ApiBody({ type: CreatePaypalOrderDto })
  async createOrder(@Body('amount') amount: string) {
    const { orderId, approveUrl } = await this.paypalService.createOrder(amount);
    return { orderId, approveUrl };
  }

  @Post('capture-order/:id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Capturar la orden de compra aprobada por PayPal' })
  @ApiBody({ type: CapturePaypalOrderDto })
  async captureOrder(
    @Body('orderId') orderId: string
  ) {
    const captureData = await this.paypalService.captureOrder(orderId);
    return captureData;
  }
}