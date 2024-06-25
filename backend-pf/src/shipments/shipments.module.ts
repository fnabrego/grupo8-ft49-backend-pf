import { Module } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { ShipmentsController } from './shipments.controller';

@Module({
  providers: [ShipmentsService],
  controllers: [ShipmentsController]
})
export class ShipmentsModule {}
