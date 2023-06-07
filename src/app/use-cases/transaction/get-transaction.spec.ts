// import { makeNotification } from '@test/factories/notification-factory';
// import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
// import { GetRecipientNotifications } from './get-recipient-notifications';
import { makeTransaction } from '@test/factories/transaction-factory';
import { InMemoryTransactionsRepository } from '@test/repositories/in-memory-transactions-repository';
import { GetTransaction } from './get-transaction-by-id';
import { Product } from '@app/entities/transaction/product';

// describe('Get transaction by id transaction', () => {
//   it('should be able to get transaction', async () => {
//     const transactionsRepository = new InMemoryTransactionsRepository();
//     const getTransaction = new GetTransaction(transactionsRepository);

//     await transactionsRepository.create(makeTransaction({ }));
//     await transactionsRepository.create(makeTransaction({ recipientId: 'recipient-1' }));
//     await transactionsRepository.create(makeTransaction({ recipientId: 'recipient-2' }));

//     const { notifications } = await getRecipientNotifications.execute({
//       recipientId: 'recipient-1',
//     });

//     expect(notifications).toHaveLength(2);
//     expect(notifications).toEqual(
//       expect.arrayContaining([
//         expect.objectContaining({ recipientId: 'recipient-1' }),
//         expect.objectContaining({ recipientId: 'recipient-1' }),
//       ]),
//     );
//   });
// });
