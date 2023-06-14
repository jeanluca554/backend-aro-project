import { Address } from '@app/entities/transaction/address';
import { Customer } from '@app/entities/transaction/customer';
import { Product } from '@app/entities/transaction/product';
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
  message: string | undefined;
  status: number | undefined;
  discount?: number;
  transactionToken?: string;
  hasError: boolean;
  description?: string;
  tid?: string;
  authorizationCode?: string;
  pixQrCode?: string;
  pixKey?: string;
  idTransactionSafe2Pay?: string;
}

interface CreateTransactionResponse {
  transaction: Transaction;
}

@Injectable()
export class CreateTransaction {
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
      discount,
      transactionToken,
      hasError,
      authorizationCode,
      description,
      tid,
      pixQrCode,
      pixKey,
      idTransactionSafe2Pay,
    } = request;

    const identity = customerIdentity;

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
      product: new Product(
        {
          description: productDescription,
          price: productPrice,
        },
        productCode,
      ),
      discount,
      transactionToken,
      installments,
      message,
      paymentMethod,
      status,
      hasError,
      authorizationCode,
      description,
      tid,
      pixKey,
      pixQrCode,
      idTransactionSafe2Pay,
    });

    await this.transactionRepository.create(transaction);

    return {
      transaction,
    };
  }
}
