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
      //installments: transaction.installments,
      message: transaction.message,
      status: transaction.status,
      //discount: transaction.discount,
      //transactionToken: transaction.transactionToken,
      description: transaction.description,
      pixKey: transaction.pixKey,
      // pixQrCode: transaction.pixQrCode,
      idTransaction: transaction.id,
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

  static toHTTPTicket(transactions: Transaction[]) {
    return transactions.flatMap((transaction) => {
      return transaction.tickets.flatMap((ticket) => {
        return transaction.products.flatMap((product) => {
          if (ticket.productId === product.id) {
            return {
              product: product.description,
              ticket: ticket.id,
              userName: transaction.customer.name,
              userCategory: transaction.customer.category,
              paymentMethod: transaction.paymentMethod,
              message: transaction.message,
              status: transaction.status,
              description: transaction.description,
            };
          }
        });
      });
    });

    // return transactions.flatMap((transaction) =>
    //   transaction.tickets.flatMap((ticket) => {
    //     const product = transaction.products.find(
    //       (product) => ticket.productId === product.id,
    //     );
    //     if (product) {
    //       return {
    //         product: product.description,
    //         ticket: ticket.id,
    //         userName: transaction.customer.name,
    //         userCategory: transaction.customer.category,
    //         paymentMethod: transaction.paymentMethod,
    //         message: transaction.message,
    //         status: transaction.status,
    //         description: transaction.description,
    //       };
    //     }
    //   }),
    // );
  }
}
