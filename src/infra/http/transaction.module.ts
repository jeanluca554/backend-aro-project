import { Module } from '@nestjs/common';
import { DatabaseTransactionModule } from '../database/database-transaction.module';
import { TransactionController } from './controllers/transaction.controller';
import { CreateTransaction } from '@app/use-cases/transaction/create-transaction';

@Module({
  imports: [DatabaseTransactionModule],
  controllers: [TransactionController],
  providers: [CreateTransaction],
})
export class TransactionModule {}
