import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionBody } from '../dtos/create-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private createTransaction: CreateTransaction) {}

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
