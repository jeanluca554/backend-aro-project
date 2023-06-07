import { Transaction } from '@app/entities/transaction/transaction';
import { TransactionRepository } from '@app/repositories/transaction-repository';
import { TransactionToDomain } from '@infra/database/prisma/mappers/prisma-transaction-mapper';

export class InMemoryTransactionsRepository implements TransactionRepository {
  public transactions: Transaction[] = [];

  async findManyByProductId(productId: string): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => transaction.product.id === productId);
  }

  // async findUniqueByTransactionId(transactionId: string): Promise<TransactionToDomain | null> {
  //   const transaction = this.transactions.find((item) => item.id === transactionId);

  //   if (!transaction) {
  //     return null;
  //   }

  //   // return transaction;
  // }

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async createUnsuccessfullyTransaction(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}
