import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { OrdersRepository } from './orders.reposirory';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './orders.entity';
import { Users } from '../users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders, Users])],
  controllers: [OrdersController],
  providers: [OrdersService, OrdersRepository]
})
export class OrdersModule {}
