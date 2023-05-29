// import { Notification as RawNotification } from '@prisma/client';
import { Transaction } from '@app/entities/transaction/transaction';
import { ProductsOnTransactions } from '@prisma/client';

type TransactionType = {
  customer: string;
  category: string;
  identity: string;
  amountPaid: number;
  paymentMethod: string;
  installments: number;
  product: string;
  paymentDate: string;
};

type ProductsOnTransactionsType = {
  description: string | undefined;
  paymentMethod: string;
  installments: number;
};

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      customerId: transaction.customer.id,
      paymentMethod: transaction.paymentMethod,
      status: transaction.status,
      message: transaction.message,
      cardToken: transaction.cardToken,
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

  // static toDomain(raw: RawNotification): Notification {
  //   return new Notification(
  //     {
  //       category: raw.category,
  //       content: new Content(raw.content),
  //       recipientId: raw.recipientId,
  //       readAt: raw.readAt,
  //       canceledAt: raw.canceledAt,
  //       createdAt: raw.createdAt,
  //     },
  //     raw.id,
  //   );
  // }

  static toDomain(raw: ProductsOnTransactionsType): ProductsOnTransactionsType {
    return {
      description: raw.description,
      installments: raw.installments,
      paymentMethod: raw.paymentMethod,
    };
  }
}
