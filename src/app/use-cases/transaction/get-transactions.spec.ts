import { makeTransaction } from '@test/factories/transaction-factory';
import { InMemoryTransactionsRepository } from '@test/repositories/in-memory-transactions-repository';
import { GetTransactions } from './get-transactions';
import { Product } from '@app/entities/transaction/product';

describe('Get transactions', () => {
  it('should be able to get transactions', async () => {
    const transactionsRepository = new InMemoryTransactionsRepository();
    const getTransactions = new GetTransactions(transactionsRepository);

    const product1 = new Product(
      {
        description: 'Tribunal do Júri',
        price: 400,
      },
      '0cff4b8c-548f-4bcf-8bcb-d33c3620f70b',
    );

    const product2 = new Product(
      {
        description: 'Tribunal do Júri',
        price: 400,
      },
      '0cff4b8c-548f-4bcf-8bcb-d33c3620f70a',
    );

    await transactionsRepository.create(makeTransaction({ product: product1 }));
    await transactionsRepository.create(makeTransaction({ product: product1 }));
    await transactionsRepository.create(makeTransaction({ product: product2 }));

    const { transactions } = await getTransactions.execute({
      productId: product1.id,
    });

    expect(transactions).toHaveLength(2);
    expect(transactions).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ product: product1 }),
        expect.objectContaining({ product: product1 }),
      ]),
    );
  });
});
