import { Address } from '@app/entities/customer/address';
import { Customer } from '@app/entities/customer/customer';
import { Product } from '@app/entities/product/product';
import { Injectable } from '@nestjs/common';
import { Transaction } from '../../entities/transaction/transaction';
import { TransactionRepository } from '../../repositories/transaction-repository';

interface CreateTransactionRequest {
  addressCity: string;
  addressComplement: string;
  addressDistrict: string;
  addressNumber: string;
  addressStateInitials: string;
  addressStreet: string;
  addressZipCode: string;
  customerEmail: string;
  customerIdentity: string;
  customerName: string;
  customerPhone: string;
  customerCategory: string;
  productCode: string;
  productDescription: string;
  productPrice: number;
  paymentMethod: string;
  installments: number;
  message: string | null;
  description: string | null;
  status: number | null;
  idTransactionSafe2Pay: string | null;
  discount?: number;
  transactionToken?: string;
  hasError: boolean;
  errorCode?: string;
  errorMessage?: string;
}
interface CreateTransactionResponse {
  transaction: Transaction;
}

@Injectable()
export class CreateUnsuccessfullyTransaction {
  constructor(private transactionRepository: TransactionRepository) {}

  async execute(request: CreateTransactionRequest): Promise<CreateTransactionResponse> {
    const {
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      customerEmail,
      customerIdentity,
      customerName,
      customerPhone,
      customerCategory,
      productCode,
      productDescription,
      productPrice,
      paymentMethod,
      installments,
      message,
      status,
      description,
      discount,
      transactionToken,
      hasError,
      errorCode,
      errorMessage,
      idTransactionSafe2Pay,
    } = request;

    const identity = customerIdentity;

    const products = [
      {
        description: productDescription,
        price: productPrice,
        productCode: productCode,
      },
    ];

    const transaction = new Transaction({
      customer: new Customer(
        {
          address: new Address({
            city: addressCity,
            complement: addressComplement,
            district: addressDistrict,
            number: addressNumber,
            stateInitials: addressStateInitials,
            street: addressStreet,
            zipCode: addressZipCode,
          }),
          email: customerEmail,
          name: customerName,
          phone: customerPhone,
          category: customerCategory,
        },
        identity,
      ),
      products: products.map((item) => {
        return new Product(
          {
            description: item.description,
            price: item.price,
          },
          item.productCode,
        );
      }),
      discount,
      transactionToken,
      installments,
      message,
      paymentMethod,
      status,
      hasError,
      errorCode,
      errorMessage,
      description,
      idTransactionSafe2Pay,
    });

    await this.transactionRepository.createUnsuccessfullyTransaction(transaction);
    //const transactionPrisma = await this.transactionRepository.createUnsuccessfullyTransaction(
    //  transaction,
    //);

    console.log('transactionPrisma');
    console.log(transaction);

    return {
      transaction,
    };
  }
}
