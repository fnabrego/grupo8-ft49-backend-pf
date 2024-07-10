import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';

@Module({
  imports: [ConfigModule],
  providers: [PaypalService],
  controllers: [PaypalController],
})
export class PaypalModule {}