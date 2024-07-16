import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Receipt } from './receipts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReceiptsRepository {
  constructor(
    @InjectRepository(Receipt) private receiptsRepository: Repository<Receipt>,
  ) { }

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

  async createReceipt(receipt: Partial<Receipt>): Promise<Receipt> {
    const newReceipt = await this.receiptsRepository.save(receipt);
    if (!receipt) {
      throw new NotFoundException(`Fail created Receipt`);
    }
    return newReceipt;
  }


  async updateReceipt(id: string, link: string): Promise <Receipt> {
    const foundReceipt = await this.receiptsRepository.findOneBy({ id });
    if (!foundReceipt) {
      throw new NotFoundException(`Receipt with id ${id} not found`);
    }
    
    foundReceipt.link = link;
    const receiptUpdated = await this.receiptsRepository.save(foundReceipt);

    return receiptUpdated;
  }
  async deleteReceipt(id: string): Promise<Receipt>{
    const foundReceipt = await this.receiptsRepository.findOneBy({ id });
    if (!foundReceipt) throw new NotFoundException(`Receipt with id:${id} not found`);
    const receiptDeleted = await this.receiptsRepository.delete(foundReceipt);
    if (!receiptDeleted) throw new InternalServerErrorException(`Recepit with id:${id} fail deleted`)
    return foundReceipt;
  }
}
