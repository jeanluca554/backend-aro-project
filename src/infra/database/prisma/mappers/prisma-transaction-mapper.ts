import {
  Transaction as RawTransaction,
  Customer as RawCustomer,
  Product as RawProduct,
  ProductsOnTransactions,
  Ticket as RawTicket,
} from '@prisma/client';
import { Transaction } from '@app/entities/transaction/transaction';
import { Customer } from '@app/entities/customer/customer';
import { Address } from '@app/entities/customer/address';
import { Product } from '@app/entities/product/product';
import { Ticket } from '@app/entities/ticket/ticket';

export type TransactionToDomain = {
  customerId: string;
  idTransaction: string;
};

export type TicketToDomain = {
  ticketId: string;
  // customerId: string;
};

export class PrismaTransactionMapper {
  static toPrisma(transaction: Transaction) {
    const prismaInstallments =
      transaction.installments === null ? undefined : transaction.installments;
    return {
      id: transaction.id,
      customerId: transaction.customer.id,
      paymentMethod: transaction.paymentMethod,
      status: Number(transaction.status),
      message: transaction.message,
      transactionToken: transaction.transactionToken,
      installments: prismaInstallments,
      discount: transaction.discount,
      canceledAt: transaction.canceledAt,
      createdAt: transaction.createdAt,
      product: transaction.products,
      description: transaction.description,
      tid: transaction.tid,
      authorizationCode: transaction.authorizationCode,
      pixKey: transaction.pixKey,
      idTransactionSafe2Pay: transaction.idTransactionSafe2Pay,
      tickets: transaction.tickets,
    };
  }

  static toPrismaUpdate(transaction: Transaction) {
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
      description: transaction.description,
      tid: transaction.tid,
      authorizationCode: transaction.authorizationCode,
      pixKey: transaction.pixKey,
      idTransactionSafe2Pay: transaction.idTransactionSafe2Pay,
      products: transaction.products,
    };
  }

  static toDomain(raw: RawTransaction): TransactionToDomain {
    return {
      idTransaction: raw.id,
      customerId: raw.customerId,
    };
  }

  static ticketToDomain(raw: RawTicket): TicketToDomain {
    return {
      ticketId: raw.id,
      // customerId: raw.customerId,
    };
  }

  static transactionToDomain(
    raw: RawTransaction & {
      customer: RawCustomer;
      products: (ProductsOnTransactions & { product: RawProduct })[];
      tickets: RawTicket[];
    },
  ): Transaction {
    return new Transaction(
      {
        customer: new Customer(
          {
            address: new Address({
              city: raw.customer.addressCity,
              complement: raw.customer.addressComplement,
              district: raw.customer.addressDistrict,
              number: raw.customer.addressNumber,
              stateInitials: raw.customer.addressStateInitials,
              street: raw.customer.addressStreet,
              zipCode: raw.customer.addressZipCode,
            }),
            category: raw.customer.category,
            email: raw.customer.email,
            name: raw.customer.name,
            phone: raw.customer.phone,
          },
          raw.customer.identity,
        ),
        hasError: false,
        installments: raw.installments,
        paymentMethod: raw.paymentMethod,
        description: raw.description,
        message: raw.message,
        status: raw.status,
        idTransactionSafe2Pay: raw.idTransactionSafe2Pay,
        pixKey: raw.pixKey,
        products: raw.products.map((item) => {
          return new Product(
            {
              description: item.product.description,
              price: item.product.price,
            },
            item.product.id,
          );
        }),
        tickets: raw.tickets.map((item) => {
          return new Ticket({
            productId: item.productId,
            createdAt: item.createdAt,
          });
        }),
      },
      raw.id,
    );
  }

  static transactionsToDomain(
    raw: (RawTransaction & {
      customer: RawCustomer;
      products: (ProductsOnTransactions & { product: RawProduct })[];
      tickets: RawTicket[];
    })[],
  ): Transaction[] {
    return raw.map((raw) => {
      return new Transaction(
        {
          customer: new Customer(
            {
              address: new Address({
                city: raw.customer.addressCity,
                complement: raw.customer.addressComplement,
                district: raw.customer.addressDistrict,
                number: raw.customer.addressNumber,
                stateInitials: raw.customer.addressStateInitials,
                street: raw.customer.addressStreet,
                zipCode: raw.customer.addressZipCode,
              }),
              category: raw.customer.category,
              email: raw.customer.email,
              name: raw.customer.name,
              phone: raw.customer.phone,
            },
            raw.customer.identity,
          ),
          hasError: false,
          installments: raw.installments,
          paymentMethod: raw.paymentMethod,
          message: raw.message,
          status: raw.status,
          description: raw.description,
          idTransactionSafe2Pay: raw.idTransactionSafe2Pay,
          pixKey: raw.pixKey,
          products: raw.products.map((item) => {
            return new Product(
              {
                description: item.product.description,
                price: item.product.price,
              },
              item.product.id,
            );
          }),
          tickets: raw.tickets.map((item) => {
            return new Ticket(
              {
                productId: item.productId,
                createdAt: item.createdAt,
              },
              item.id,
            );
          }),
        },
        raw.id,
      );
    });
  }
}
