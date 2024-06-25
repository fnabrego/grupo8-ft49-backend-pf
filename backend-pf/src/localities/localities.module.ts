import { Module } from '@nestjs/common';
import { LocalitiesController } from './localities.controller';
import { LocalitiesService } from './localities.service';
import { LocalitiesRepository } from './localities.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Locality } from './localities.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Locality])],
  controllers: [LocalitiesController],
  providers: [LocalitiesService, LocalitiesRepository],
})
export class LocalitiesModule {}
