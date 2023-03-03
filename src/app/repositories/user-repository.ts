import { User } from '@app/entities/user/user';

export abstract class UsersRepository {
  abstract create(user: User): Promise<void>;
}
