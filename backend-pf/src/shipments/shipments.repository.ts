import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Shipment } from './shipments.entity';
import { ShipmentDto } from './shipments.dto';
import * as prices from '../utils/data.json';
import { ShippingPrice } from './prices/shippingprices.entity';
import { Locality } from 'src/localities/localities.entity';

@Injectable()
export class ShipmentsRepository {
  constructor(
    @InjectRepository(Shipment)
    private shipmentRepository: Repository<Shipment>,
    @InjectRepository(ShippingPrice)
    private shippingPriceRepository: Repository<ShippingPrice>,
    @InjectRepository(Locality)
    private localityRepository: Repository<Locality>,
  ) {}
  async getShipments(page: number, limit: number): Promise<Shipment[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be greater than 0.');
    }

    const skip = (page - 1) * limit;
    const shipments = await this.shipmentRepository.find({
      take: limit,
      skip: skip,
    });

    return shipments;
  }
  async priceShipment(shipmentPrice: Partial<ShipmentDto>) {
    const { locality_origin, locality_destination } = shipmentPrice;
    const calculatedShipment = await this.shippingPriceRepository.findOne({
      where: {
        origin: locality_origin,
        destination: locality_destination,
      },
    });
    console.log(calculatedShipment);
    
    shipmentPrice.shipment_price = calculatedShipment.price;
    return shipmentPrice;
  }
  async postShipments(data: ShipmentDto): Promise<Shipment> {
    const { locality_origin, locality_destination } = data;
    const shippingprice = await this.shippingPriceRepository.findOne({
      where: {
        origin: locality_origin,
        destination: locality_destination,
      },
    });
    if (!shippingprice) {
      const shippingprice2 = await this.shippingPriceRepository.findOne({
        where: {
          origin: locality_destination,
          destination: locality_origin,
        },
      });
      data.shipment_price = shippingprice2.price;
    } else {
      data.shipment_price = shippingprice.price;
    }
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
  async preloadShipmentPrices() {
    const loadedLocalities = await this.localityRepository.find();
    if (!loadedLocalities.length)
      throw new BadRequestException('You have to preload all localities first');
    const alreadyLoaded = await this.shippingPriceRepository.find();
    if (alreadyLoaded.length) return null;
    for (const origin in prices) {
      for (const destination in prices[origin]) {
        const price = prices[origin][destination];
        const localityOrigin = await this.localityRepository.findOneBy({
          name: origin,
        });
        if (!localityOrigin)
          throw new NotFoundException(`Cannot find ${localityOrigin}`);
        const localityDestination = await this.localityRepository.findOneBy({
          name: destination,
        });
        if (!localityDestination)
          throw new NotFoundException(`Cannot find ${localityDestination}`);
        const shippingPrice = new ShippingPrice();
        shippingPrice.origin = localityOrigin;
        shippingPrice.destination = localityDestination;
        shippingPrice.price = price;
        await this.shippingPriceRepository.save(shippingPrice);
      }
    }
    console.log('Shipment prices added successfully');
    return 'Shipment prices added successfully';
  }
}
