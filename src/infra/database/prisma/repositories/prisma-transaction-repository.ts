import { Injectable } from '@nestjs/common';
import { Transaction } from '@app/entities/transaction/transaction';
import { TransactionRepository } from '@app/repositories/transaction-repository';
import { PrismaService } from '../prisma.service';
import {
  PrismaTransactionMapper,
  TransactionToDomain,
} from '../mappers/prisma-transaction-mapper';
import { PrismaUnsuccessfullyTransactionMapper } from '../mappers/prisma-unsuccessfully-transaction-mapper';

@Injectable()
export class PrismaTransactionRepository implements TransactionRepository {
  constructor(private prismaService: PrismaService) {}

  async create(transaction: Transaction): Promise<void> {
    const {
      canceledAt,
      transactionToken,
      createdAt,
      customerId,
      discount,
      id,
      installments,
      message,
      paymentMethod,
      status,
      description,
      authorizationCode,
      pixKey,
      idTransactionSafe2Pay,
      tid,
      product,
    } = PrismaTransactionMapper.toPrisma(transaction);

    await this.prismaService.transaction.create({
      data: {
        id,
        installments,
        paymentMethod,
        canceledAt,
        transactionToken,
        createdAt,
        customerId,
        discount,
        message,
        status,
        description,
        authorizationCode,
        tid,
        pixKey,
        idTransactionSafe2Pay,
        products: {
          createMany: {
            data: product.map((item) => {
              return {
                productId: item.id,
              };
            }),
          },
        },
      },
    });
  }

  async createUnsuccessfullyTransaction(transaction: Transaction): Promise<void> {
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

  // async findManyByProductId(productId: string): Promise<Transaction[]> {
  async findManyByProductId(productId: string): Promise<any[]> {
    const transactions = await this.prismaService.productsOnTransactions.findMany({
      where: {
        productId,
      },
      select: {
        transaction: {
          select: {
            createdAt: true,
            paymentMethod: true,
            installments: true,
            discount: true,
            id: true,
            customer: {
              select: {
                name: true,
                identity: true,
                category: true,
              },
            },
          },
        },
        product: {
          select: {
            description: true,
            price: true,
          },
        },
      },
    });

    console.log(transactions);
    // return transactions;
    return transactions.map((transaction) => {
      // return PrismaTransactionMapper.toDomain(transaction);
      return transaction;
    });
  }

  async findUniqueByTransactionId(transactionId: string): Promise<TransactionToDomain | null> {
    const transaction = await this.prismaService.transaction.findUnique({
      where: {
        id: transactionId,
      },
    });
    if (!transaction) {
      return null;
    }

    return PrismaTransactionMapper.toDomain(transaction);
  }

  async findById(transactionId: string): Promise<Transaction | null> {
    const transaction = await this.prismaService.transaction.findFirst({
      where: {
        idTransactionSafe2Pay: transactionId,
      },
      include: {
        customer: true,
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!transaction) {
      return null;
    }

    console.log('Transaction no método FindFirst', transaction);

    return PrismaTransactionMapper.transactionToDomain(transaction);
  }

  async updateStatus(transaction: Transaction): Promise<void> {
    const raw = PrismaTransactionMapper.toPrisma(transaction);

    console.log('o Raw é: ', raw);

    await this.prismaService.transaction.update({
      where: {
        id: raw.id,
      },
      data: {
        status: raw.status,
      },
    });
  }
}
