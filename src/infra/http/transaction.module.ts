import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DatabaseTransactionModule } from '../database/database-transaction.module';
import { TransactionController } from './controllers/transaction.controller';
import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { CreateUnsuccessfullyTransaction } from '@app/use-cases/transaction/create-unsuccessfully-transaction';
import { CreateCustomerTransaction } from '@app/use-cases/transaction/create-customer-transaction';
import { GetTransactions } from '@app/use-cases/transaction/get-transactions';
import { GetTransaction } from '@app/use-cases/transaction/get-transaction-by-id';
import { GetTickets } from '@app/use-cases/transaction/get-tickets';
import { UpdateStatusTransaction } from '@app/use-cases/transaction/update-status-transaction';
import { Safe2PayTransactionService } from '@infra/providers/safe2PayTransaction.service';
import { HttpTransactionSafe2Pay } from '@infra/providers/httpTransactionSafe2pay.service';

@Module({
  imports: [DatabaseTransactionModule, HttpModule],
  controllers: [TransactionController],
  providers: [
    CreateTransaction,
    Safe2PayTransactionService,
    CreateCustomerTransaction,
    CreateUnsuccessfullyTransaction,
    GetTransactions,
    GetTransaction,
    GetTickets,
    UpdateStatusTransaction,
    HttpTransactionSafe2Pay,
  ],
})
export class TransactionModule {}
