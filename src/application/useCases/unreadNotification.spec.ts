import { InMemoryNotificationsRepository } from '@test/repositories/inMemoryNotificationRepository';
import { NotificationNotFound } from './errors/notificationNotFound';
import { makeNotification } from '@test/factories/notificationFactory';
import { UnreadNotification } from './unreadNotification';

describe('Unread Notification', () => {
  test('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = makeNotification({
      readAt: new Date(),
    });

    await notificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  test('should not be able to unread a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'fake-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
