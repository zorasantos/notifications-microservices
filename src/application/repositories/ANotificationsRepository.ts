import { Notification } from '../entities/Notification/notification';

export abstract class ANotificationRepository {
  abstract create(notification: Notification): Promise<void>;
}
