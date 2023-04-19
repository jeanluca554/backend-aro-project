import { Transaction } from '@app/entities/transaction/transaction';

export abstract class TransactionService {
  abstract process(transaction: Transaction): Promise<object>;
  abstract processAxios(transaction: Transaction): Promise<object>;
}
