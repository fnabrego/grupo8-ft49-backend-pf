import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PackagesModule } from './packages/packages.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { LocalitiesModule } from './localities/localities.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
// import { ReceiptsModule } from './receipts/receipts.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm'),
    }),
    AuthModule,
    UsersModule,
    PackagesModule,
    ShipmentsModule,
    LocalitiesModule,
    OrdersModule,
    // ReceiptsModule,

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
