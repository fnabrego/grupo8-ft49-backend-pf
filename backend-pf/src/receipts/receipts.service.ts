import { Injectable } from '@nestjs/common';
import { ReceiptsRepository } from './receipts.repository';

@Injectable()
export class ReceiptsService {
    constructor ( private readonly receiptsRepository: ReceiptsRepository ) { }

    updateReceipt(id: string, link: string) {
        return this.receiptsRepository.updateReceipt(id, link);
      }
}
