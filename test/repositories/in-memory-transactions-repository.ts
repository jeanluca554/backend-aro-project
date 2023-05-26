import { Transaction } from '@app/entities/transaction/transaction';
import { TransactionRepository } from '@app/repositories/transaction-repository';

export class InMemoryTransactionsRepository implements TransactionRepository {
  public transactions: Transaction[] = [];

  async findManyByProductId(productId: string): Promise<Transaction[]> {
    return this.transactions.filter((transaction) => transaction.product.id === productId);
  }

  async create(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }

  async createUnsuccessfullyTransaction(transaction: Transaction): Promise<void> {
    this.transactions.push(transaction);
  }
}
