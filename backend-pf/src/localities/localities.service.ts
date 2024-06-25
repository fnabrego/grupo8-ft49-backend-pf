import { Injectable } from '@nestjs/common';
import { LocalityDto } from './localities.dto';
import { LocalitiesRepository } from './localities.repository';

@Injectable()
export class LocalitiesService {
  constructor(private readonly localitiesRepository: LocalitiesRepository) {}
  getLocalities() {
    return this.localitiesRepository.getLocalities();
  }
  postLocalities(data: LocalityDto) {
    return this.localitiesRepository.postLocalities(data);
  }
  putLocalities(id: number, data: LocalityDto) {
    return this.localitiesRepository.putLocalities(id, data);
  }
  deleteLocalities(id: number) {
    return this.localitiesRepository.deleteLocalities(id);
  }
}
