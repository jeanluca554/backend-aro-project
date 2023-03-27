import { Module } from '@nestjs/common';
import { DatabaseTransactionModule } from '../database/database-transaction.module';
import { TransactionController } from './controllers/transaction.controller';
import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { CreateUnsuccessfullyTransaction } from '@app/use-cases/transaction/create-unsuccessfully-transaction';
import { CreateCustomerTransaction } from '@app/use-cases/transaction/create-customer-transaction';
import { Safe2PayTransactionService } from '@infra/providers/safe2PayTransaction.service';

@Module({
  imports: [DatabaseTransactionModule],
  controllers: [TransactionController],
  providers: [
    CreateTransaction,
    Safe2PayTransactionService,
    CreateCustomerTransaction,
    CreateUnsuccessfullyTransaction,
  ],
})
export class TransactionModule {}
