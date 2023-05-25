import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CancelNotification } from '@app/use-cases/notification/cancel-notification';
import { CountRecipientNotifications } from '@app/use-cases/notification/count-recipient-notifications';
import { GetRecipientNotifications } from '@app/use-cases/notification/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/notification/read-notification';
import { UnreadNotification } from '@app/use-cases/notification/unread-notification';
import { SendNotification } from '@app/use-cases/notification/send-notification';
import { CreateNotificationBody } from '../dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { IsPublic } from '@infra/decorators/is-public.decorator';

@Controller('product')
export class ProductsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
  ) {}

  @IsPublic()
  @Post()
  async create(@Body() body: CreateNotificationBody) {
    // console.log(body)
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
