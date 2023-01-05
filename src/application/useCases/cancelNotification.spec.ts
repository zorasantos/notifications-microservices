import { CancelNotification } from './cancelNotification';
import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';

describe('Cancel Notification', () => {
  test('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = makeNotification();

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
