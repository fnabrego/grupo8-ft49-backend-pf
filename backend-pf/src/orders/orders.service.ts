import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.repository';
import { UpdateOrdertDto } from './orders.dto';
import { PackageDto } from '../packages/packages.dto';
import { ShipmentDto } from '../shipments/shipments.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}
  getOrder(id: string) {
    return this.ordersRepository.getOrder(id);
  }
  getOrders(page?: number, limit?: number) {
    return this.ordersRepository.getOrders(page, limit);
  }

  quoteOrder(packages: PackageDto, shipment: Partial<ShipmentDto>) {
    return this.ordersRepository.quoteOrder(packages, shipment);
  }

  addOrder(id: string, packages: PackageDto, shipment: ShipmentDto, dataPayment: PaypalPayment) {
    return this.ordersRepository.addOrder(id, packages, shipment, dataPayment);
  }

  updateOrder(id: string, data: UpdateOrdertDto) {
    return this.ordersRepository.updateOrder(id, data);
  }

  deleteOrder(id: string) {
    return this.ordersRepository.deleteOrder(id);
  }
}
