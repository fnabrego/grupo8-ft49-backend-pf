import { Module } from '@nestjs/common';
import { ReceiptsController } from './receipts.controller';
import { ReceiptsService } from './receipts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receipts.entity';
import { User } from '../users/users.entity';
import { Order } from '../orders/orders.entity';
import { ReceiptsRepository } from './receipts.repository';
import { FirebaseService } from '../firebase/firebase.service';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, User, Order])],
  controllers: [ReceiptsController],
  providers: [ReceiptsService, ReceiptsRepository, FirebaseService],
})
export class ReceiptsModule {}
