import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ANotificationRepository } from 'src/application/repositories/ANotificationsRepository';
import { PrismaNotificationsRepository } from './prisma/repositories/prismaNotificationsRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ANotificationRepository,
      useClass: PrismaNotificationsRepository,
    },
  ],

  exports: [ANotificationRepository],
})
export class DatabaseModule {}
