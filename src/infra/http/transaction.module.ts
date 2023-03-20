import { Module } from '@nestjs/common';
import { DatabaseTransactionModule } from '../database/database-transaction.module';
import { TransactionController } from './controllers/transaction.controller';
import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';
import { Safe2PayTransactionService } from '@infra/providers/safe2PayTransaction.service';

@Module({
  imports: [DatabaseTransactionModule],
  controllers: [TransactionController],
  providers: [CreateTransaction, Safe2PayTransactionService],
})
export class TransactionModule {}
