import { Transaction } from '@app/entities/transaction/transaction';
import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transaction-repository';
import { TransactionToDomain } from '@infra/database/prisma/mappers/prisma-transaction-mapper';

interface GetTransactionsRequest {
  transactionId: string;
}

interface GetTransactionsResponse {
  transaction: TransactionToDomain | null;
}

@Injectable()
export class GetTransaction {
  constructor(private transactionsRepository: TransactionRepository) {}

  // async execute(request: GetTransactionsRequest): Promise<GetTransactionsResponse> {
  async execute(request: GetTransactionsRequest): Promise<GetTransactionsResponse> {
    const { transactionId } = request;

    const transaction = await this.transactionsRepository.findUniqueByTransactionId(
      transactionId,
    );
    return {
      transaction,
    };
  }
}
