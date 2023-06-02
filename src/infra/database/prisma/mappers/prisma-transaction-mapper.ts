// import { Notification as RawNotification } from '@prisma/client';
import { Transaction } from '@app/entities/transaction/transaction';

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      customerId: transaction.customer.id,
      paymentMethod: transaction.paymentMethod,
      status: transaction.status,
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
    };
  }
}
