import { Injectable } from '@nestjs/common';
import { Content } from '../entities/Notification/content';
import { Notification } from '../entities/Notification/notification';
import { ANotificationRepository } from '../repositories/ANotificationsRepository';

interface ISendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface ISendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: ANotificationRepository) {}

  async execute(
    request: ISendNotificationRequest,
  ): Promise<ISendNotificationResponse> {
    const { recipientId, content, category } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
