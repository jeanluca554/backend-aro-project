import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateTransactionBody } from '../dtos/create-transaction';
import { TransactionViewModel } from '../view-models/transaction-view-model';
import { Safe2PayProvider } from '@infra/providers/Safe2PayProvider';

@Controller('transaction')
export class TransactionController {
  constructor(
    private createTransaction: CreateTransaction,
    private safe2PayProvider: Safe2PayProvider,
  ) {}

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

  @IsPublic()
  @Post('teste')
  process(): Promise<void> {
    return this.safe2PayProvider.process();
  }
}
