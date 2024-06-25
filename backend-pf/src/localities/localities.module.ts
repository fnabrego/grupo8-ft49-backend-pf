import { Module } from '@nestjs/common';
import { LocalitiesController } from './localities.controller';
import { LocalitiesService } from './localities.service';

@Module({
  controllers: [LocalitiesController],
  providers: [LocalitiesService]
})
export class LocalitiesModule {}
