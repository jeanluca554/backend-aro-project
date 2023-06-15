import { TransactionToDomain } from '@infra/database/prisma/mappers/prisma-transaction-mapper';
import { Transaction } from '../entities/transaction/transaction';

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<void>;
  abstract createUnsuccessfullyTransaction(transaction: Transaction): Promise<void>;
  abstract findManyByProductId(productId: string): Promise<any>;
  abstract findById(transactionId: string): Promise<Transaction | null>;
  abstract findUniqueByTransactionId(transaction: string): Promise<TransactionToDomain | null>;
  abstract updateStatus(transaction: Transaction): Promise<void>;
}
