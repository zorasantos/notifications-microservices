import { Notification } from 'src/application/entities/Notification/notification';
import { ANotificationRepository } from 'src/application/repositories/ANotificationsRepository';

export class InMemoryNotificationsRepository
  implements ANotificationRepository
{
  public notifications: Notification[] = [];

  async create(notification: Notification): Promise<void> {
    this.notifications.push(notification);
  }
}
