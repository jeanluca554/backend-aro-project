import { User as RawUser } from '@prisma/client';
import { User } from '@app/entities/user/user';

export class PrismaUserMapper {
  static toPrisma(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: user.password,
      name: user.name,
    };
  }

  static toDomain(raw: RawUser): User {
    return new User(
      {
        email: raw.email,
        password: 'Password',
        name: raw.name,
      },
      raw.id,
    );
  }
}
