import { Transaction as RawTransaction } from '@prisma/client';
import { Transaction } from '@app/entities/transaction/transaction';

export type TransactionToDomain = {
  customerId: string;
  idTransaction: string;
};

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      customerId: transaction.customer.id,
      paymentMethod: transaction.paymentMethod,
      status: Number(transaction.status),
      message: transaction.message,
      transactionToken: transaction.transactionToken,
      installments: transaction.installments,
      discount: transaction.discount,
      canceledAt: transaction.canceledAt,
      createdAt: transaction.createdAt,
      product: transaction.product.id,
      description: transaction.description,
      tid: transaction.tid,
      authorizationCode: transaction.authorizationCode,
      pixKey: transaction.pixKey,
      idTransactionSafe2Pay: transaction.idTransactionSafe2Pay,
    };
  }

  static toDomain(raw: RawTransaction): TransactionToDomain {
    return {
      idTransaction: raw.id,
      customerId: raw.customerId,
    };
  }
}
