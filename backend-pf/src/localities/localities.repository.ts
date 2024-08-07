import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocalityDto } from './localities.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Locality } from './localities.entity';
import { Repository } from 'typeorm';
import * as data from '../utils/localities.json';

@Injectable()
export class LocalitiesRepository {
  constructor(
    @InjectRepository(Locality)
    private localityRepository: Repository<Locality>,
  ) {}
  async getLocalities(): Promise<LocalityDto[]> {
    return await this.localityRepository.find();
  }
  async postLocalities(data: LocalityDto): Promise<LocalityDto> {
    const { name } = data;
    const existingLocality = await this.localityRepository.findOne({
      where: { name },
    });
    if (existingLocality) {
      throw new BadRequestException(`Locality '${name}' already exists`);
    }
    const locality = await this.localityRepository.save(data);
    return locality;
  }
  async putLocalities(id: number, data: LocalityDto): Promise<Locality> {
    const locality = await this.localityRepository.findOneBy({ id });
    if (!locality)
      throw new NotFoundException(`Locality with id ${id} not found`);
    await this.localityRepository.update(id, data);
    return locality;
  }
  async deleteLocalities(id: number) {
    const locality = await this.localityRepository.findOneBy({ id });
    if (!locality)
      throw new NotFoundException(`Locality ${locality.name} not found`);
    await this.localityRepository.remove(locality);
    return locality;
  }
  async preloadLocalities() {
    const alreadyLoaded = await this.localityRepository.find();
    if (alreadyLoaded.length) return null;
    data?.map(async (element) => {
      await this.localityRepository
        .createQueryBuilder()
        .insert()
        .into(Locality)
        .values({ name: element })
        .orIgnore()
        .execute();
    });
    console.log('Localities added successfully');
    return 'Localities added successfully';
  }
}
