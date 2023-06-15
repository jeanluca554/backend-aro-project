import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transaction-repository';
import { TransactionNotFound } from './../errors/transaction-not-found';

interface UpdateStatusTransactionRequest {
  idTransaction: string;
  statusId: number;
}
// type UpdateStatusTransactionRequest = {
//   transactionId: string;
//   statusId: number;
// };

type UpdateStatusTransactionResponse = void;

@Injectable()
export class UpdateStatusTransaction {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute(
    request: UpdateStatusTransactionRequest,
  ): Promise<UpdateStatusTransactionResponse> {
    const { idTransaction, statusId } = request;

    const transaction = await this.transactionsRepository.findById(idTransaction);

    if (!transaction) {
      throw new TransactionNotFound();
    }

    console.log('a transação encontrada:', transaction);

    if (statusId === 3) transaction.setStatusAuthorized();

    await this.transactionsRepository.save(transaction);
  }
}
