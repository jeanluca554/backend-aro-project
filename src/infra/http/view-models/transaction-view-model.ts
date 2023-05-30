import { Transaction } from '@app/entities/transaction/transaction';

type ProductsOnTransactionsType = {
  transactionId: string;
  productId: string;
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
      cardToken: transaction.transactionToken,
      description: transaction.description,
    };
  }

  static toHTTPTransaction(transaction: ProductsOnTransactionsType) {
    return {
      // content: transaction.paymentMethod,
      // customer: transaction.customer,
      // product: transaction.product,
      transactionId: transaction.transactionId,
      productId: transaction.productId,
    };
  }

  static toHTTPError(transaction: Transaction) {
    return {
      errorCode: transaction.errorCode,
      errorMessage: transaction.errorMessage,
    };
  }
}
