import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { User } from '../users/users.entity';
import { UpdateOrdertDto } from './orders.dto';
import { PackageDto } from '../packages/packages.dto';
import { ShipmentDto } from '../shipments/shipments.dto';
import { PackagesRepository } from '../packages/packages.repository';
import { ShipmentsRepository } from '../shipments/shipments.repository';
import { statusOrder } from './statusOrder.enum';
import { EmailRepository } from 'src/mails/emails.repository';
import { Receipt } from '../receipts/receipts.entity';
import { ReceiptsRepository } from '../receipts/receipts.repository';
import { PdfService } from '../pdf/pdf.service';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class OrdersRepository {
  constructor(
    @InjectRepository(Order) private ordersRepo: Repository<Order>,
    @InjectRepository(User) private usersRepo: Repository<User>,
    private readonly packagesRepository: PackagesRepository,
    private readonly shipmentsRepository: ShipmentsRepository,
    private readonly emailRepository: EmailRepository,
    private readonly receiptRepository: ReceiptsRepository,
    private readonly pdfService: PdfService,
    private readonly firebaseService: FirebaseService
  ) { }

  async getOrder(id: string): Promise<Order> {
    const order = await this.ordersRepo.findOne({
      where: { id, isDeleted: false },
      relations: ['user', 'shipments', 'packages', 'receipt'],
    });
    if (!order) throw new NotFoundException('Order not found');
    if (order) {
      delete order.user.password;
    }
    return order;
  }

  async getOrders(page?: number, limit?: number): Promise<Order[]> {
    if (!page || !limit) {
      const orders = await this.ordersRepo.find({
        where: { isDeleted: false },
        relations: {
          user: true,
          shipments: {
            locality_origin: true,
            locality_destination: true,
          },
          packages: true,
          receipt: true,
        },
      });
      if (orders.length === 0) throw new NotFoundException('Orders void');
      orders.forEach((order) => {
        if (order) {
          delete order.user.password;
        }
      });
      return orders;
    }

    const skip = (page - 1) * limit;
    const orders = await this.ordersRepo.find({
      relations: {
        user: true,
        shipments: {
          locality_origin: true,
          locality_destination: true,
        },
        packages: true,
        receipt: true,
      },
      take: limit,
      skip: skip,
    });
    if (orders.length === 0) throw new NotFoundException('Orders void');
    orders.forEach((order) => {
      if (order) {
        delete order.user.password;
      }
    });
    return orders;
  }

  async quoteOrder(packages: PackageDto, shipment: Partial<ShipmentDto>) {
    const packagePrice = await this.packagesRepository.pricePackage(packages);
    if (!packagePrice) throw new BadRequestException('Invalid package size');

    const shipmentPrice =
      await this.shipmentsRepository.priceShipment(shipment);

    const finalPrice =
      packagePrice.package_price + shipmentPrice.shipment_price;

    return finalPrice;
  }

  async addOrder(
    id: string,
    packages: PackageDto,
    shipment: ShipmentDto,
    dataPayment: PaypalPayment,
  ): Promise<Order> {
    const user = await this.usersRepo.findOneBy({ id });
    if (!user) throw new NotFoundException('User invalid');
    const { password, ...userNoPassword } = user;

    const newPackage = await this.packagesRepository.addPackage(packages);
    if (!newPackage)
      throw new InternalServerErrorException('Add Package failled');

    const newShipment = await this.shipmentsRepository.postShipments(shipment);
    if (!newShipment) {
      await this.packagesRepository.deletePackage(newPackage.id);
      throw new InternalServerErrorException('Add Shipment failled');
    }

    const finalPrice = newPackage.package_price + newShipment.shipment_price;

    const newOrder = new Order();
    newOrder.user = userNoPassword;
    newOrder.packages = [newPackage];
    newOrder.final_price = finalPrice;
    newOrder.date = new Date();
    newOrder.status = statusOrder.AWAITING_PICKUP;
    newOrder.shipments = newShipment;

    const confirmOrder = await this.ordersRepo.save(newOrder);
    if (!confirmOrder) {
      await this.packagesRepository.deletePackage(newPackage.id);
      await this.shipmentsRepository.deleteShipments(newShipment.id);
      throw new InternalServerErrorException('Create Order failled');
    }
    await this.emailRepository.sendEmailOrder(id);

    const receipt = new Receipt();
    receipt.user = userNoPassword;
    const newReceipt = await this.receiptRepository.createReceipt(receipt);
    confirmOrder.receipt = newReceipt;
    const saveOrder = await this.ordersRepo.save(confirmOrder);

    const pdfBuffer = await this.pdfService.generateReceipt(dataPayment);
    const fileName = `${dataPayment.id}.pdf`;

    const link = await this.firebaseService.uploadFile(pdfBuffer, fileName);
    const loadReceipt = await this.receiptRepository.updateReceipt(newReceipt.id, link);

    if (!loadReceipt) throw new InternalServerErrorException('Fail load link Receipt');
    const finalOrder = await this.ordersRepo.findOne({
      where: { id: saveOrder.id, isDeleted: false },
      relations: ['user', 'shipments', 'packages', 'receipt'],
    });

    if (!finalOrder) {
      await this.packagesRepository.deletePackage(newPackage.id);
      await this.shipmentsRepository.deleteShipments(newShipment.id);
      await this.receiptRepository.deleteReceipt(newReceipt.id);
      throw new InternalServerErrorException('Create Order failled');
    }
    return finalOrder;
  }

  async updateOrder(id: string, data: UpdateOrdertDto): Promise<Order> {
    const foundOrder = await this.ordersRepo.findOne({
      where: { id, isDeleted: false },
      relations: { user: true },
    });
    if (!foundOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    const { status } = data;
    const order = new Order();
    order.status = status;
    await this.ordersRepo.update(id, order);
    const orderCheck = await this.ordersRepo.findOneBy({ id });
    if (orderCheck.status === 'Entregado')
      await this.emailRepository.sendReviewUsEmail(foundOrder.user.id);
    else await this.emailRepository.sendEmailStatus(foundOrder.user.id);
    return orderCheck;
  }

  async deleteOrder(id: string) {
    const foundOrder = await this.ordersRepo.findOneBy({ id });
    if (!foundOrder) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    foundOrder.isDeleted = true;
    await this.ordersRepo.save(foundOrder);
    return foundOrder;
  }
}
