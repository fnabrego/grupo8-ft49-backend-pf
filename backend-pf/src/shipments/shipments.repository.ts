import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipments.entity';
import { ShipmentDto } from './shipments.dto';
import { Locality } from 'src/localities/localities.entity';

@Injectable()
export class ShipmentsRepository {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(Locality)
    private localityRepository: Repository<Locality>,
  ) {}
  async getShipments(page: number, limit: number): Promise<Shipment[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be greater than 0.');
    }

    const skip = (page - 1) * limit;
    let shipments = await this.shipmentRepository.find({
      take: limit,
      skip: skip,
    });

    return shipments;
  }
  async postShipments(data: ShipmentDto): Promise<Shipment> {
    return await this.shipmentRepository.save(data);
  }
  async putShipments(id: string, data: ShipmentDto): Promise<Shipment> {
    const shipment = await this.shipmentRepository.findOneBy({ id });
    if (!shipment)
      throw new NotFoundException(`Shipment with id ${id} not found`);
    await this.shipmentRepository.update(id, data);
    return shipment;
  }
  async deleteShipments(id: string) {
    const shipment = await this.shipmentRepository.findOneBy({ id });
    if (!shipment)
      throw new NotFoundException(`Shipment with id ${id} not found`);
    await this.shipmentRepository.remove(shipment);
    return shipment;
  }
}
