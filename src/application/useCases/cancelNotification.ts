import { Injectable } from '@nestjs/common';
import { ANotificationRepository } from '../repositories/ANotificationsRepository';
import { NotificationNotFound } from './errors/notificationNotFound';

interface ICancelNotificationRequest {
  recipientId: string;
}

type CancelNotificationResponse = void;

@Injectable()
export class CancelNotification {
  constructor(private notificationRepository: ANotificationRepository) {}

  async execute(
    request: ICancelNotificationRequest,
  ): Promise<CancelNotificationResponse> {
    const { recipientId } = request;

    const notification = await this.notificationRepository.findById(
      recipientId,
    );

    if (!notification) {
      throw new NotificationNotFound();
    }

    notification.cancel();

    await this.notificationRepository.save(notification);
  }
}
