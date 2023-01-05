import { CancelNotification } from './cancelNotification';
import { Notification } from '@application/entities/Notification/notification';
import { Content } from '@application/entities/Notification/content';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';

describe('Cancel Notification', () => {
  test('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      content: new Content('Voce recebeu uma notificacao!'),
      category: 'social',
      recipientId: 'example-recipient-id',
    });

    await notificationRepository.create(notification);

    await cancelNotification.execute({
      recipientId: notification.id,
    });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  test('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() => {
      return cancelNotification.execute({
        recipientId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
