import { Module } from '@nestjs/common';
import { TransactionRepository } from 'src/app/repositories/transaction-repository';
import { CustomerRepository } from 'src/app/repositories/customer-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaTransactionRepository } from './prisma/repositories/prisma-transaction-repository';
import { PrismaCustomerRepository } from './prisma/repositories/prisma-customer-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: TransactionRepository,
      useClass: PrismaTransactionRepository,
    },
    {
      provide: CustomerRepository,
      useClass: PrismaCustomerRepository,
    },
  ],
  exports: [TransactionRepository, CustomerRepository],
})
export class DatabaseTransactionModule {}
