import { Content } from './content';
import { Notification } from './notification';

describe('Notification', () => {
  test('should be able to create a notification', () => {
    const notification = new Notification({
      content: new Content('Voce recebeu uma notificacao'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notification).toBeTruthy();
  });
});
