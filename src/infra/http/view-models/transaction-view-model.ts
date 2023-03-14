import { Transaction } from '@app/entities/transaction/transaction';

export class TransactionViewModel {
  static toHTTP(transaction: Transaction) {
    return {
      content: transaction.paymentMethod,
    };
  }
}
