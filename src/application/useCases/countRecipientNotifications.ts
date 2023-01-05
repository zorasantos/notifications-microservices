import { Injectable } from '@nestjs/common';
import { ANotificationRepository } from '@application/repositories/ANotificationsRepository';

interface ICountRecipientNotificationRequest {
  recipientId: string;
}

interface ICountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotifications {
  constructor(private notificationRepository: ANotificationRepository) {}

  async execute(
    request: ICountRecipientNotificationRequest,
  ): Promise<ICountRecipientNotificationResponse> {
    const { recipientId } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientId,
    );

    return { count };
  }
}
