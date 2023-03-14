import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@app/use-cases/notification/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/notification/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/notification/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/notification/read-notification';
import { UnreadNotification } from '@app/use-cases/notification/unread-notification';
import { SendNotification } from 'src/app/use-cases/notification/send-notification';

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
