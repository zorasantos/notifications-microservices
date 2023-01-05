import { Notification } from '@application/entities/Notification/notification';
import { ANotificationRepository } from '@application/repositories/ANotificationsRepository';
import { PrismaService } from '../../prisma.service';
import { Injectable } from '@nestjs/common';
import { PrismaNotificationMapper } from '../mappers/prismaNotificationMapper';

@Injectable()
export class PrismaNotificationsRepository implements ANotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }
}
