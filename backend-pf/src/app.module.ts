import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { OrdersModule } from './orders/orders.module';
import { PackagesModule } from './packages/packages.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { LocalitiesModule } from './localities/localities.module';

@Module({
  imports: [UsersModule, OrdersModule, PackagesModule, ShipmentsModule, LocalitiesModule],
  controllers: [AppController, UsersController],
  providers: [AppService],
})
export class AppModule {}
