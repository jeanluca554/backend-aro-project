import {
  TransactionToDomain,
  TicketToDomain,
} from '@infra/database/prisma/mappers/prisma-transaction-mapper';
import { Transaction } from '../entities/transaction/transaction';

export abstract class TransactionRepository {
  abstract create(transaction: Transaction): Promise<void>;
  abstract createUnsuccessfullyTransaction(transaction: Transaction): Promise<void>;
  abstract findManyByProductId(productId: string): Promise<any>;
  abstract findById(transactionId: string): Promise<Transaction | null>;
  abstract findTickets(
    identity: string,
    email: string,
  ): Promise<Transaction[] | null | string>;
  abstract findUniqueByTransactionId(transaction: string): Promise<TransactionToDomain | null>;
  abstract findUniqueTicket(idTicket: string): Promise<TicketToDomain | null | string>;
  abstract updateStatus(transaction: Transaction): Promise<void>;
}
