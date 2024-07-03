import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Receipt } from './receipts.entity';
import { Repository } from 'typeorm';
import { ReceiptDto } from './receipts.dto';
import { Order } from 'src/orders/orders.entity';

@Injectable()
export class receiptsRepository {
  constructor(
    @InjectRepository(Receipt)
    private receiptsRepository: Repository<Receipt>,
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
  ) {}

  async getReceipts(page: number, limit: number): Promise<Receipt[]> {
    if (page < 1 || limit < 1) {
      throw new BadRequestException('Page and limit must be greater than 0.');
    }

    const skip = (page - 1) * limit;
    const receipts = await this.receiptsRepository.find({
      take: limit,
      skip: skip,
    });

    return receipts;
  }

  async getReceipt(id: string): Promise<Receipt> {
    const receipt = await this.receiptsRepository.findOneBy({ id });
    if (!receipt) {
      throw new NotFoundException(`Receipt with id ${id} not found`);
    }
    return receipt;
  }

  // async createReceipt(data: ReceiptDto): Promise<Receipt> {
  //     const order = await this.ordersRepository.findOne({where: {id: data.orderId}})
  //     if(!order) {
  //         throw new NotFoundException('Order not found')
  //     }

  // }
}
