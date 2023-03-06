import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/user-repository';
import { PrismaService } from '../prisma.service';
import { PrismaUserMapper } from '../mappers/prisma-user-mapper';

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      return null;
    }

    return PrismaUserMapper.toDomain(user);
  }

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
