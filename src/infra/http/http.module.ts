import { Module } from '@nestjs/common';
import { NotificationsController } from './controllers/notifications.controller';
import { SendNotification } from '@application/useCases/sendNotification';
import { DatabaseModule } from '../database/database.module';
import { CancelNotification } from '@application/useCases/cancelNotification';
import { CountRecipientNotifications } from '@application/useCases/countRecipientNotifications';
import { GetRecipientNotifications } from '@application/useCases/getRecipientNotifications';
import { ReadNotification } from '@application/useCases/readNotification';
import { UnreadNotification } from '@application/useCases/unreadNotification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotifications,
    GetRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
