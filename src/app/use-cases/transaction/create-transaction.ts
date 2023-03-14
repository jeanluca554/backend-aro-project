import { Injectable } from '@nestjs/common';
import { Transaction } from '../../entities/transaction/transaction';
import { TransactionRepository } from '../../repositories/transaction-repository';

interface CreateTransactionRequest {
  paymentMethod: string;
}

interface CreateTransactionResponse {
  transaction: Transaction;
}

@Injectable()
export class CreateTransaction {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(
    request: CreateTransactionRequest,
  ): Promise<CreateTransactionResponse> {
    const { paymentMethod } = request;

    const transaction = new Transaction({
      paymentMethod,
    });

    await this.transactionRepository.create(transaction);

    return {
      transaction,
    };
  }
}
