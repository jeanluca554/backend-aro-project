import { Content } from './content';
import { Notification } from './notification';

describe('Notification content', () => {
  it('should be able to crate a notification', () => {
    const notification = new Notification({
      content: new Content('Nova solicitação de amizade'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
