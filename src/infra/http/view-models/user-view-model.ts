import { User } from '@app/entities/user/user';

export class UserViewModel {
  static toHTTP(user: User) {
    return {
      id: user.id,
      email: user.email,
      password: 'Password',
      name: user.name,
    };
  }
}
