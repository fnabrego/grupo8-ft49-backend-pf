import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "./orders.entity";
import { User } from "../users/users.entity";
import { Shipment } from '../shipments/shipments.entity';
import { Package } from '../packages/packages.entity';
import { Receipt } from "../receipts/receipts.entity";
import { CreateOrderDto } from "./orders.dto";
import { CreateUserDto } from "../users/users.dto";
import { PackageDto } from "../packages/packages.dto";
import { ShipmentDto } from "../shipments/shipments.dto";
import { PackagesRepository } from "../packages/packages.repository";
import { ShipmentsRepository } from "../shipments/shipments.repository";
import { receiptsRepository } from "../receipts/receipts.repository";

@Injectable()
export class OrdersRepository {
    constructor(
        @InjectRepository(Order) private ordersRepo: Repository<Order>,
        @InjectRepository(User) private usersRepo: Repository<User>,
        private readonly packagesRepository: PackagesRepository,
        private readonly shipmentsRepository: ShipmentsRepository
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

    async addOrder(id: string, packages: PackageDto, shipment: ShipmentDto): Promise<Order> {

        const user = await this.usersRepo.findOneBy({ id });
        const { password, ...userNoPassword } = user;
        if (!user) throw new NotFoundException('User invalid');

        const newPackage = await this.packagesRepository.addPackage(packages);

        const newShipment = await this.shipmentsRepository.postShipments(shipment);

        const finalPrice = newPackage.package_price + newShipment.shipment_price;

        const newOrder = new Order;
        newOrder.user = userNoPassword;
        newOrder.packages = [newPackage];
        newOrder.final_price = finalPrice;
        // const date = new Date(); //!Verificar formato de fecha
        // const currentDate = date.toISOString().split('T')[0];
        newOrder.date = new Date();
        newOrder.status = 'Solicitado';
        newOrder.shipments = newShipment;
        return await this.ordersRepo.save(newOrder);

    }

    async updateOrder(id: string, order: Partial<Order>) {
        return 'modificacion de orden';
    }

    async deleteOrder(id: string) {
        return 'eliminacion de orden'
    }


}