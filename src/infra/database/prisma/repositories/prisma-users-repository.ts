import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  // async findById(notificationId: string): Promise<User | null> {
  //   const notification = await this.prismaService.notification.findUnique({
  //     where: {
  //       id: notificationId,
  //     },
  //   });

  //   if (!notification) {
  //     return null;
  //   }

  //   return PrismaNotificationMapper.toDomain(notification);
  // }

  async create(user: User): Promise<void> {
    const raw = PrismaUserMapper.toPrisma(user);

    await this.prismaService.user.create({
      data: raw,
    });
  }

  // async save(notification: Notification): Promise<void> {
  //   const raw = PrismaNotificationMapper.toPrisma(notification);

  //   await this.prismaService.notification.update({
  //     where: {
  //       id: raw.id,
  //     },
  //     data: raw,
  //   });
  // }
}
