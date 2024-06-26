import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shipment } from './shipments.entity';
import { ShipmentsRepository } from './shipments.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Shipment])],
  providers: [ShipmentsService, ShipmentsRepository],
  controllers: [ShipmentsController],
})
export class ShipmentsModule {}
