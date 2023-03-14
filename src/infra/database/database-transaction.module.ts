import { Module } from '@nestjs/common';
import { TransactionRepository } from 'src/app/repositories/transaction-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transaction-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class DatabaseTransactionModule {}
