import { Notification } from '@application/entities/Notification/notification';
import { ANotificationRepository } from '@application/repositories/ANotificationsRepository';
import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements ANotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prismaService.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notification);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: {
        id: recipientId,
      },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: { id: raw.id },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
