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

  // static toDomain(raw: RawTransaction): Transaction {
  //   return new Transaction(
  //     {
  //       paymentMethod: raw.paymentMethod,
  //     //   creditCardHolder: raw.,
  //     // creditCardCardNumber: raw.,
  //     // creditCardExpirationDate: raw.,
  //     // creditCardSecurityCode: raw.,
  //     creditCardInstallmentQuantity: raw.,
  //     addressCity: raw.,
  //     addressComplement: raw.,
  //     addressDistrict: raw.,
  //     addressNumber: raw.,
  //     addressStateInitials: raw.,
  //     addressStreet: raw.,
  //     addressZipCode: raw.,
  //     courseCode: raw.,
  //     courseDescription: raw.,
  //     courseUnitPrice: raw.,
  //     customerEmail: raw.,
  //     customerIdentity: raw.,
  //     customerName: raw.,
  //     customerPhone: raw.,
  //       canceledAt: raw.canceledAt,
  //       createdAt: raw.createdAt,
  //     },
  //     raw.id,
  //   );
  // }
}
