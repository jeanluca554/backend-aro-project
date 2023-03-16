import { Module } from '@nestjs/common';
import { DatabaseTransactionModule } from '../database/database-transaction.module';
import { TransactionController } from './controllers/transaction.controller';
import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { Safe2PayProvider } from '@infra/providers/Safe2PayProvider';

@Module({
  imports: [DatabaseTransactionModule],
  controllers: [TransactionController],
  providers: [CreateTransaction, Safe2PayProvider],
})
export class TransactionModule {}
