import { Injectable } from '@nestjs/common';
import { ANotificationRepository } from '../repositories/ANotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFound';

interface IReadNotificationRequest {
  notificationId: string;
}

type ReadNotificationResponse = void;

@Injectable()
export class ReadNotification {
  constructor(private notificationRepository: ANotificationRepository) {}

  async execute(
    request: IReadNotificationRequest,
  ): Promise<ReadNotificationResponse> {
    const { notificationId } = request;

    const notification = await this.notificationRepository.findById(
      notificationId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.read();

    await this.notificationRepository.save(notification);
  }
}
