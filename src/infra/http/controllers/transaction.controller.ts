import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionBody } from '../dtos/create-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';
import { Safe2PayTransactionService } from '@infra/providers/safe2PayTransaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(
    private createTransaction: CreateTransaction,
    private safe2PayTransaction: Safe2PayTransactionService,
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
    } = body;

    const transaction = await this.safe2PayTransaction.process({
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

    console.log(transaction);
    console.log(transaction.ResponseDetail?.Message);

    return transaction;

    // const { transaction } = await this.createTransaction.execute({
    //   paymentMethod,
    // });

    // return { notification: TransactionViewModel.toHTTP(transaction) };
  }

  // @IsPublic()
  // @Post('teste')
  // processTeste(): Promise<void> {
  //   return this.safe2PayTransaction.process();
  // }
}
