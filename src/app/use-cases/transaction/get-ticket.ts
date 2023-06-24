import { Transaction } from '@app/entities/transaction/transaction';
import { Injectable } from '@nestjs/common';
import { TransactionRepository } from '../../repositories/transaction-repository';
import { TransactionNotFound } from '../errors/transaction-not-found';
import { MessageError } from '../errors/message-error';

interface GetTicketRequest {
  ticketId: string;
}

@Injectable()
export class GetTicket {
  constructor(private transactionsRepository: TransactionRepository) {}

  async execute(request: GetTicketRequest) {
    const { ticketId } = request;

    const ticket = await this.transactionsRepository.findUniqueTicket(ticketId);

    if (typeof ticket === 'string') {
      return ticket;
    }

    return {
      ticket,
    };
  }
}
