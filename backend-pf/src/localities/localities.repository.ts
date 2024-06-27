import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LocalityDto } from './localities.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Locality } from './localities.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LocalitiesRepository {
  constructor(
    @InjectRepository(Locality)
    private localityRepository: Repository<Locality>,
  ) {}
  async getLocalities(): Promise<Locality[]> {
    return await this.localityRepository.find();
  }
  async postLocalities(data: LocalityDto): Promise<Locality> {
    const { name } = data;
    const existingLocality = await this.localityRepository.findOne({ where: { name } });
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
      throw new NotFoundException(`Locality with id ${id} not found`);
    await this.localityRepository.remove(locality);
    return locality;
  }
}
