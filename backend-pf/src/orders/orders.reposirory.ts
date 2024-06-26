import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { User } from "../users/users.entity";
import { Shipment } from '../shipments/shipments.entity';
import { Package } from '../packages/packages.entity';
import { Receipt } from "../receipts/receipts.entity";
import { CreateOrderDto } from "./orders.dto";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) private ordersRepo: Repository<Order>,
        @InjectRepository(User) private usersRepo: Repository<User>,
        @InjectRepository(Shipment) private shipmentRepo: Repository<Shipment>,
        @InjectRepository(Package) private packagesRepo: Repository<Package>,
        @InjectRepository(Receipt) private receiptsRepo: Repository<Receipt>,
    ) { }

    async getOrder(id: string) {
        const order = await this.ordersRepo.findOne({
            where: { id },
            relations: ['users', 'shipments', 'packages', 'receipt']
        });
        if (!order) throw new NotFoundException('Orden no encontrada')
        return 'una orden';
    }

    async getOrders(page?: number, limit?: number) {
        return 'todas las ordenes';
    }

    async addOrder(order: CreateOrderDto) {
        return 'nueva orden';
    }

    async updateOrder(id: string, order: Partial<Order>) {
        return 'modificacion de orden';
    }

    async deleteOrder(id: string) {
        return 'eliminacion de orden'
    }


}