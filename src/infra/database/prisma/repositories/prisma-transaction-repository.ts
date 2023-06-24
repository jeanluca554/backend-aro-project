import { Injectable } from '@nestjs/common';
import { Transaction } from '@app/entities/transaction/transaction';
import { TransactionRepository } from '@app/repositories/transaction-repository';
import { PrismaService } from '../prisma.service';
import {
  PrismaTransactionMapper,
  TicketToDomain,
  TransactionToDomain,
} from '../mappers/prisma-transaction-mapper';
import { PrismaUnsuccessfullyTransactionMapper } from '../mappers/prisma-unsuccessfully-transaction-mapper';
import { MessageError } from '@app/use-cases/errors/message-error';

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
      tickets,
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
        tickets: {
          createMany: {
            data: tickets.map((ticket) => {
              return {
                id: ticket.id,
                productId: ticket.productId,
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

    // console.log(transactions);
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
        tickets: true,
      },
    });

    if (!transaction) {
      return null;
    }

    return PrismaTransactionMapper.transactionToDomain(transaction);
  }

  async updateStatus(transaction: Transaction): Promise<void> {
    const raw = PrismaTransactionMapper.toPrisma(transaction);

    await this.prismaService.transaction.update({
      where: {
        id: raw.id,
      },
      data: {
        status: raw.status,
        description: 'Pagamento pix aprovado!',
        message: 'Pagamento Autorizado',
      },
    });
  }

  async findTickets(identity: string, email: string): Promise<Transaction[] | null | string> {
    const user = await this.prismaService.customer.findUnique({
      where: {
        identity: identity,
      },
    });

    if (!user || user?.email !== email) {
      return 'Não foram encontrados dados com as informações inseridas.';
    }

    const transactions = await this.prismaService.transaction.findMany({
      where: {
        customerId: identity,
      },
      include: {
        customer: true,
        products: {
          include: {
            product: true,
          },
        },
        tickets: true,
      },
    });

    // console.log('In find Tickets: ', transactions);

    return PrismaTransactionMapper.transactionsToDomain(transactions);
  }

  async findUniqueTicket(idTicket: string): Promise<TicketToDomain | null | string> {
    const ticket = await this.prismaService.ticket.findUnique({
      where: {
        id: idTicket,
      },
      include: {
        transaction: true,
      },
    });

    if (!ticket || ticket.transaction.status !== 3) {
      return 'Não foram encontrados dados com as informações inseridas.';
    }

    return PrismaTransactionMapper.ticketToDomain(ticket);
  }
}
