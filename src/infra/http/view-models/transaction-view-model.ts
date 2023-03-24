import { Transaction } from '@app/entities/transaction/transaction';

export class TransactionViewModel {
  static toHTTP(transaction: Transaction) {
    return {
      content: transaction.paymentMethod,
      customer: transaction.customer,
      product: transaction.product,
      installments: transaction.installments,
      message: transaction.message,
      status: transaction.status,
      discount: transaction.discount,
      cardToken: transaction.cardToken,
    };
  }
}
