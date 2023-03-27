import { Transaction } from '../entities/transaction/transaction';

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<void>;
  abstract createUnsuccessfullyTransaction(
    transaction: Transaction,
  ): Promise<void>;
}
