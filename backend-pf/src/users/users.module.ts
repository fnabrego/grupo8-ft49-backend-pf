import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';

import { Order } from '../orders/orders.entity';
import { Receipt } from '../receipts/receipts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Receipt])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
