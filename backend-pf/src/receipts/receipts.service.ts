import { Injectable } from '@nestjs/common';
import { receiptsRepository } from './receipts.repository';

@Injectable()
export class ReceiptsService {
    constructor (
        private readonly receiptsRepository: receiptsRepository
    ) {}
}
