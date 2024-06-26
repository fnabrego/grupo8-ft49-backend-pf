import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.reposirory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './orders.entity';
import { User } from '../users/users.entity';
import { Shipment } from '../shipments/shipments.entity';
import { Package } from '../packages/packages.entity';
import { Receipt } from '../receipts/receipts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Shipment, Package, Receipt])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
