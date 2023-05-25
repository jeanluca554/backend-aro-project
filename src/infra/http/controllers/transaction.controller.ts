import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { CreateUnsuccessfullyTransaction } from '@app/use-cases/transaction/create-unsuccessfully-transaction';
import { CreateCustomerTransaction } from '@app/use-cases/transaction/create-customer-transaction';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionBody } from '../dtos/create-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';
import { Safe2PayTransactionService } from '@infra/providers/safe2PayTransaction.service';
import { HttpTransactionSafe2Pay } from '@infra/providers/httpTransactionSafe2pay.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private safe2PayTransaction: Safe2PayTransactionService,
    private httpTransactionSafe2Pay: HttpTransactionSafe2Pay,
    private createCustomer: CreateCustomerTransaction,
    private createTransaction: CreateTransaction,
    private createUnsuccessfullyTransaction: CreateUnsuccessfullyTransaction,
  ) {}

  @IsPublic()
  @Post()
  async process(@Body() body: CreateTransactionBody) {
    // console.log(body)
    const {
      paymentMethod,
      creditCardHolder,
      creditCardCardNumber,
      creditCardExpirationDate,
      creditCardSecurityCode,
      creditCardInstallmentQuantity,
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      courseCode,
      courseDescription,
      courseUnitPrice,
      customerEmail,
      customerIdentity,
      customerName,
      customerPhone,
      discount,
    } = body;

    const transactionSafe2pay = await this.safe2PayTransaction.process({
      paymentMethod,
      creditCardHolder,
      creditCardCardNumber,
      creditCardExpirationDate,
      creditCardSecurityCode,
      creditCardInstallmentQuantity,
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      courseCode,
      courseDescription,
      courseUnitPrice,
      customerEmail,
      customerIdentity,
      customerName,
      customerPhone,
    });

    console.log(transactionSafe2pay);
    // return transaction;

    await this.createCustomer.execute({
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      email: customerEmail,
      identity: customerIdentity,
      name: customerName,
      phone: customerPhone,
    });

    if (transactionSafe2pay.HasError) {
      const { transaction } = await this.createUnsuccessfullyTransaction.execute({
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
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail?.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        cardToken: transactionSafe2pay.ResponseDetail?.Token,
        discount,
        hasError: transactionSafe2pay.HasError,
        errorCode: transactionSafe2pay.ErrorCode,
        errorMessage: transactionSafe2pay.Error,
      });
      console.log(transaction);
      return {
        transactionResult: TransactionViewModel.toHTTPError(transaction),
      };
    } else {
      const { transaction } = await this.createTransaction.execute({
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
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail?.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        cardToken: transactionSafe2pay.ResponseDetail?.Token,
        discount,
        hasError: transactionSafe2pay.HasError,
        authorizationCode: transactionSafe2pay.ResponseDetail?.AuthorizationCode,
        description: transactionSafe2pay.ResponseDetail?.Description,
        tid: transactionSafe2pay.ResponseDetail?.Tid,
      });

      console.log(transaction);

      return {
        transactionResult: TransactionViewModel.toHTTP(transaction),
      };
    }
  }

  @IsPublic()
  @Post('axios')
  async processAxios(@Body() body: CreateTransactionBody) {
    // console.log(body)
    const {
      paymentMethod,
      creditCardHolder,
      creditCardCardNumber,
      creditCardExpirationDate,
      creditCardSecurityCode,
      creditCardInstallmentQuantity,
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      courseCode,
      courseDescription,
      courseUnitPrice,
      customerEmail,
      customerIdentity,
      customerName,
      customerPhone,
      discount,
    } = body;

    const transactionSafe2pay = await this.httpTransactionSafe2Pay.processAxios({
      paymentMethod,
      creditCardHolder,
      creditCardCardNumber,
      creditCardExpirationDate,
      creditCardSecurityCode,
      creditCardInstallmentQuantity,
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      courseCode,
      courseDescription,
      courseUnitPrice,
      customerEmail,
      customerIdentity,
      customerName,
      customerPhone,
    });

    // console.log(transactionSafe2pay);
    // return transaction;

    await this.createCustomer.execute({
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      email: customerEmail,
      identity: customerIdentity,
      name: customerName,
      phone: customerPhone,
    });

    if (transactionSafe2pay.HasError) {
      const { transaction } = await this.createUnsuccessfullyTransaction.execute({
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
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail?.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        cardToken: transactionSafe2pay.ResponseDetail?.Token,
        discount,
        hasError: transactionSafe2pay.HasError,
        errorCode: transactionSafe2pay.ErrorCode,
        errorMessage: transactionSafe2pay.Error,
      });
      console.log(transaction);
      return {
        transactionResult: TransactionViewModel.toHTTPError(transaction),
      };
    } else {
      const { transaction } = await this.createTransaction.execute({
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
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail?.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        cardToken: transactionSafe2pay.ResponseDetail?.Token,
        discount,
        hasError: transactionSafe2pay.HasError,
        authorizationCode: transactionSafe2pay.ResponseDetail?.AuthorizationCode,
        description: transactionSafe2pay.ResponseDetail?.Description,
        tid: transactionSafe2pay.ResponseDetail?.Tid,
      });

      console.log(transaction);

      return {
        transactionResult: TransactionViewModel.toHTTP(transaction),
      };
    }
  }
}
