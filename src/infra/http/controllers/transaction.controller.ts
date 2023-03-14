import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionBody } from '../dtos/create-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';

@Controller('transaction')
export class TransactionController {
  constructor(private createTransaction: CreateTransaction) {}

  @IsPublic()
  @Post()
  async create(@Body() body: CreateTransactionBody) {
    // console.log(body)
    const { paymentMethod } = body;

    const { transaction } = await this.createTransaction.execute({
      paymentMethod,
    });

    return { notification: TransactionViewModel.toHTTP(transaction) };
  }
}
