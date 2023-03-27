// import { Notification as RawNotification } from '@prisma/client';
import { Transaction } from '@app/entities/transaction/transaction';

export class PrismaUnsuccessfullyTransactionMapper {
  static toPrisma(transaction: Transaction) {
    return {
      id: transaction.id,
      customerId: transaction.customer.id,
      paymentMethod: transaction.paymentMethod,
      // status: transaction.status,
      message: transaction.errorMessage,
      errorCode: transaction.errorCode,
      createdAt: transaction.createdAt,
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
