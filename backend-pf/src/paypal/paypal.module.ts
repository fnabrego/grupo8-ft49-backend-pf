import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PaypalService } from './paypal.service';
import { PaypalController } from './paypal.controller';
import { FirebaseService } from '../firebase/firebase.service';
import { Receipt } from '../receipts/receipts.entity';
import { ReceiptsRepository } from '../receipts/receipts.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PdfService } from './pdf/pdf.service';

@Module({
  imports: [ TypeOrmModule.forFeature([Receipt]), ConfigModule],
    providers: [PaypalService, PdfService, FirebaseService, ReceiptsRepository],
    controllers: [PaypalController],
})
export class PaypalModule { }