import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { PackagesModule } from './packages/packages.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { LocalitiesModule } from './localities/localities.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './config/typeorm';
import { AuthModule } from './auth/auth.module';
import { FirebaseModule } from './firebase/firebase.module';
import { FileUploadModule } from './file-upload/file-upload.module';
import { EmailModule } from './mails/emails.module';
import { PaypalModule } from './paypal/paypal.module';
import { ReviewsModule } from './reviews/reviews.module';
import paypalConfig from './config/paypal.config';

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
    LocalitiesModule,
    ShipmentsModule,
    PackagesModule,
    OrdersModule,
    ReceiptsModule,
    FileUploadModule,
    EmailModule,
    ConfigModule.forRoot({
      load: [paypalConfig],
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
    FirebaseModule,
    PaypalModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}