import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Order } from '../orders/orders.entity';
import { Receipt } from '../receipts/receipts.entity';
import { admin, transportista } from 'src/utils/preloadUsers';
import { Role } from 'src/roles/roles.enum';

@Module({
  imports: [TypeOrmModule.forFeature([User, Order, Receipt])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule implements OnModuleInit {
  constructor(private readonly usersService: UsersService) {}

  async onModuleInit() {
    await this.usersService.preload();
  }
}
