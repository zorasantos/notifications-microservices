import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepository';
import { CountRecipientNotifications } from './countRecipientNotifications';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Count recipient Notifications', () => {
  test('should be able to count notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-1' }),
    );

    await notificationRepository.create(
      makeNotification({ recipientId: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: 'recipient-1',
    });

    expect(count).toEqual(2);
  });
});
