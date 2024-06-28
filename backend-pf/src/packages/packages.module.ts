import { Module } from '@nestjs/common';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './packages.entity';
import { PackagesRepository } from './packages.repository';
import { PackagePrices } from './prices.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, PackagePrices])],
  controllers: [PackagesController],
  providers: [PackagesService, PackagesRepository]
})
export class PackagesModule {}
