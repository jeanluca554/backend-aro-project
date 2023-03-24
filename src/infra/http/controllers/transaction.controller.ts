import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { CreateCustomerTransaction } from '@app/use-cases/transaction/create-customer-transaction';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionBody } from '../dtos/create-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';
import { Safe2PayTransactionService } from '@infra/providers/safe2PayTransaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private safe2PayTransaction: Safe2PayTransactionService,
    private createCustomer: CreateCustomerTransaction,
    private createTransaction: CreateTransaction,
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

    const customer = await this.createCustomer.execute({
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

    console.log(customer);

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
    });

    console.log(transaction);

    return {
      transactionDatabase: TransactionViewModel.toHTTP(transaction),
    };
  }

  // @IsPublic()
  // @Post('teste')
  // processTeste(): Promise<void> {
  //   return this.safe2PayTransaction.process();
  // }
}
