import { Transaction } from '@app/entities/transaction/transaction';

type TransactionErrorSafe2Pay = {
  ErrorCode: string | undefined;
  Error: string | undefined;
};

export class TransactionViewModel {
  static toHTTP(transaction: Transaction) {
    return {
      // content: transaction.paymentMethod,
      // customer: transaction.customer,
      // product: transaction.product,
      installments: transaction.installments,
      message: transaction.message,
      status: transaction.status,
      discount: transaction.discount,
      cardToken: transaction.cardToken,
    };
  }

  static toHTTPError(transaction: TransactionErrorSafe2Pay) {
    return {
      errorCode: transaction.ErrorCode,
      errorMessage: transaction.Error,
    };
  }
}
