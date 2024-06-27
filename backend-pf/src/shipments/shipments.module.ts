import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipments.entity';
import { ShipmentsRepository } from './shipments.repository';
import { ShippingPrice } from './prices/shippingprices.entity';
import { Locality } from 'src/localities/localities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment, ShippingPrice, Locality])],
  providers: [ShipmentsService, ShipmentsRepository],
  controllers: [ShipmentsController],
})
export class ShipmentsModule {}
