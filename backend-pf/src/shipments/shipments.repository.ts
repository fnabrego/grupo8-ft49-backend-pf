import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipments.entity';
import { ShipmentDto } from './shipments.dto';

@Injectable()
export class ShipmentsRepository {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
  ) {}
  async getShipments(): Promise<Shipment[]> {
    return await this.shipmentRepository.find();
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
