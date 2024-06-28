import { Injectable } from '@nestjs/common';
import { OrdersRepository } from './orders.reposirory';
import { Order } from './orders.entity';
import { CreateOrderDto } from './orders.dto';
import { CreateUserDto } from '../users/users.dto';
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

  addOrder(id: string, packages: PackageDto, shipment: ShipmentDto) {
    return this.ordersRepository.addOrder(id, packages, shipment);
  }

  updateOrder(id: string, order: Partial<Order>) {
    return this.ordersRepository.updateOrder(id, order);
  }

  deleteOrder(id: string) {
    return this.ordersRepository.deleteOrder(id);
  }
}
