import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { GetTickets } from '@app/use-cases/transaction/get-tickets';
import { CreateUnsuccessfullyTransaction } from '@app/use-cases/transaction/create-unsuccessfully-transaction';
import { CreateCustomerTransaction } from '@app/use-cases/transaction/create-customer-transaction';
import { GetTransactions } from '@app/use-cases/transaction/get-transactions';
import { GetTransaction } from '@app/use-cases/transaction/get-transaction-by-id';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { BadRequestException, Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateTransactionBody } from '../dtos/create-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';
import { Safe2PayTransactionService } from '@infra/providers/safe2PayTransaction.service';
import { HttpTransactionSafe2Pay } from '@infra/providers/httpTransactionSafe2pay.service';
import { CreateTransactionNotificationBody } from '../dtos/create-transaction-notification-body';
import { UpdateStatusTransaction } from '@app/use-cases/transaction/update-status-transaction';

@Controller('transaction')
export class TransactionController {
  constructor(
    private safe2PayTransaction: Safe2PayTransactionService,
    private httpTransactionSafe2Pay: HttpTransactionSafe2Pay,
    private createCustomer: CreateCustomerTransaction,
    private createTransaction: CreateTransaction,
    private updateStatusTransaction: UpdateStatusTransaction,
    private createUnsuccessfullyTransaction: CreateUnsuccessfullyTransaction,
    private getTickets: GetTickets,
    private getTransaction: GetTransactions,
    private getTransactionById: GetTransaction,
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
      customerCategory,
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
      category: customerCategory,
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
        customerCategory,
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        description: transactionSafe2pay.ResponseDetail.Description,
        transactionToken: transactionSafe2pay.ResponseDetail?.Token,
        discount,
        idTransactionSafe2Pay: transactionSafe2pay.ResponseDetail.IdTransaction,
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
        customerCategory,
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail?.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        transactionToken: transactionSafe2pay.ResponseDetail?.Token,
        idTransactionSafe2Pay: transactionSafe2pay.ResponseDetail.IdTransaction,
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
      creditCardIdentity,
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
      customerCategory,
      discount,
    } = body;

    let creditCardIdentityForSafe2Pay;

    creditCardIdentity.length > 0
      ? (creditCardIdentityForSafe2Pay = creditCardIdentity)
      : (creditCardIdentityForSafe2Pay = customerIdentity);

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
      customerIdentity: creditCardIdentityForSafe2Pay,
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
      category: customerCategory,
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
        customerCategory,
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail?.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        description: transactionSafe2pay.ResponseDetail.Description,
        transactionToken: transactionSafe2pay.ResponseDetail?.Token,
        idTransactionSafe2Pay: transactionSafe2pay.ResponseDetail.IdTransaction,
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
      // ensure IdTransaction will be a string
      const transactionId =
        transactionSafe2pay.ResponseDetail?.IdTransaction !== null
          ? transactionSafe2pay.ResponseDetail?.IdTransaction.toString()
          : null;

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
        customerCategory,
        installments: creditCardInstallmentQuantity,
        message: transactionSafe2pay.ResponseDetail?.Message,
        paymentMethod,
        productCode: courseCode,
        productDescription: courseDescription,
        productPrice: courseUnitPrice,
        status: transactionSafe2pay.ResponseDetail?.Status,
        transactionToken: transactionSafe2pay.ResponseDetail?.Token,
        discount,
        hasError: transactionSafe2pay.HasError,
        authorizationCode: transactionSafe2pay.ResponseDetail?.AuthorizationCode,
        description: transactionSafe2pay.ResponseDetail?.Description,
        tid: transactionSafe2pay.ResponseDetail?.Tid,
        pixQrCode: transactionSafe2pay.ResponseDetail?.QrCode,
        pixKey: transactionSafe2pay.ResponseDetail?.Key,
        idTransactionSafe2Pay: transactionId,
        // idTransactionSafe2Pay: transactionSafe2pay.ResponseDetail?.IdTransaction?.toString(),
      });

      console.log(transaction);

      return {
        transactionResult: TransactionViewModel.toHTTP(transaction),
      };
    }
  }

  @Get(':productId')
  async getTransactions(@Param('productId') productId: string) {
    const { transactions } = await this.getTransaction.execute({
      productId,
    });

    return {
      transactions,
    };
  }

  @IsPublic()
  @Get('from/:transactionId')
  async getFromRecipient(@Param('transactionId') transactionId: string) {
    const { transaction } = await this.getTransactionById.execute({
      transactionId,
    });

    return {
      transaction,
    };
  }

  @IsPublic()
  @Post('notify')
  async processNotification(@Body() body: CreateTransactionNotificationBody) {
    const { IdTransaction, TransactionStatus } = body;

    const statusId = TransactionStatus.Id;

    const idTransaction = IdTransaction.toString();

    await this.updateStatusTransaction.execute({ idTransaction, statusId });
  }

  @IsPublic()
  @Get('tickets/:identity/:email')
  async findTickets(@Param('identity') identity: string, @Param('email') email: string) {
    const { transactions } = await this.getTickets.execute({ identity, email });

    if (typeof transactions === 'string') {
      throw new BadRequestException(transactions);
    }

    return transactions;
  }
}
