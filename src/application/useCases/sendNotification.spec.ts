import { SendNotification } from './sendNotification';
import { InMemoryNotificationsRepository } from '../../../test/repositories/inMemoryNotificationRepository';

describe('Send Notification', () => {
  test('should be able to create a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      content: 'Voce recebeu uma notificacao',
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
