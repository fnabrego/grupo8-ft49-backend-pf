import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Orders } from "./orders.entity";
import { Users } from "../users/users.entity";
import { Shipment } from '../shipments/shipments.entity';
import { Packages } from '../packages/packages.entity';
import { Receipts } from '../receipt/receipt.entity';
import { CreateOrderDto } from "./orders.dto";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Orders) private ordersRepo: Repository<Orders>,
        @InjectRepository(Users) private usersRepo: Repository<Users>,
        @InjectRepository(Shipment) private shipmentRepo: Repository<Shipment>,
        @InjectRepository(Packages) private packagesRepo: Repository<Packages>,
        @InjectRepository(Receipts) private receiptsRepo: Repository<Receipts>,
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

    async updateOrder(id: string, order: Partial<Orders>) {
        return 'modificacion de orden';
    }

    async deleteOrder(id: string) {
        return 'eliminacion de orden'
    }


}