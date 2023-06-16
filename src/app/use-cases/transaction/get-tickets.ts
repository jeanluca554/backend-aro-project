import { Transaction } from '@app/entities/transaction/transaction';
import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transaction-repository';
import { TransactionNotFound } from '../errors/transaction-not-found';
import { MessageError } from '../errors/message-error';

interface GetTicketsRequest {
  identity: string;
  email: string;
}

@Injectable()
export class GetTickets {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute(request: GetTicketsRequest) {
    const { identity, email } = request;

    const transactions = await this.transactionsRepository.findTickets(identity, email);

    if (typeof transactions === 'string') {
      // throw new MessageError('testando novo erro');
    }

    if (!transactions) {
      throw new TransactionNotFound();
    }
    return {
      transactions,
    };
  }
}
