import { Injectable } from '@nestjs/common';
import { Transaction } from '@app/entities/transaction/transaction';
import { TransactionRepository } from '@app/repositories/transaction-repository';
import { PrismaService } from '../prisma.service';
import { PrismaTransactionMapper } from '../mappers/prisma-transaction-mapper';
import { PrismaUnsuccessfullyTransactionMapper } from '../mappers/prisma-unsuccessfully-transaction-mapper';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  async create(transaction: Transaction): Promise<void> {
    const {
      canceledAt,
      cardToken,
      createdAt,
      customerId,
      discount,
      id,
      installments,
      message,
      paymentMethod,
      status,
      product,
    } = PrismaTransactionMapper.toPrisma(transaction);

    await this.prismaService.transaction.create({
      data: {
        id,
        installments,
        paymentMethod,
        canceledAt,
        cardToken,
        createdAt,
        customerId,
        discount,
        message,
        status,
        products: {
          create: [
            {
              product: {
                connect: {
                  id: product,
                },
              },
            },
          ],
        },
      },
    });
  }

  async createUnsuccessfullyTransaction(
    transaction: Transaction,
  ): Promise<void> {
    const { createdAt, customerId, errorCode, id, message, paymentMethod } =
      PrismaUnsuccessfullyTransactionMapper.toPrisma(transaction);

    // await this.prismaService.transaction.create({
    await this.prismaService.transactionUnsuccessfully.create({
      data: {
        id,
        errorCode,
        message,
        paymentMethod,
        createdAt,
        customerId,
      },
    });
  }
}
