import { Injectable } from '@nestjs/common';
import { ANotificationRepository } from '../repositories/ANotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFound';

interface IUnreadNotificationRequest {
  notificationId: string;
}

type UnreadNotificationResponse = void;

@Injectable()
export class UnreadNotification {
  constructor(private notificationRepository: ANotificationRepository) {}

  async execute(
    request: IUnreadNotificationRequest,
  ): Promise<UnreadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.unread();

    await this.notificationRepository.save(notification);
  }
}
