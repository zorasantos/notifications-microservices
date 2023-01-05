import { Injectable } from '@nestjs/common';
import { ANotificationRepository } from '@application/repositories/ANotificationsRepository';
import { Notification } from '@application/entities/Notification/notification';

interface IGetRecipientNotificationRequest {
  recipientId: string;
}

interface IGetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotifications {
  constructor(private notificationRepository: ANotificationRepository) {}

  async execute(
    request: IGetRecipientNotificationRequest,
  ): Promise<IGetRecipientNotificationResponse> {
    const { recipientId } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientId);

    return { notifications };
  }
}
