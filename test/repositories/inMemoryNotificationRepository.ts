import { Notification } from '@application/entities/Notification/notification';
import { ANotificationRepository } from '@application/repositories/ANotificationsRepository';

export class InMemoryNotificationsRepository
  implements ANotificationRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
