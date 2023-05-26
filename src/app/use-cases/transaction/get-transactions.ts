import { Transaction } from '@app/entities/transaction/transaction';
import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transaction-repository';

interface GetTransactionsRequest {
  productId: string;
}

interface GetTransactionsResponse {
  transactions: Transaction[];
}

@Injectable()
export class GetTransactions {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute(request: GetTransactionsRequest): Promise<GetTransactionsResponse> {
    const { productId } = request;

    const transactions = await this.transactionsRepository.findManyByProductId(productId);
    return {
      transactions,
    };
  }
}
