import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { FindUsers } from '../user/find-user';
import { UnauthorizedError } from '../errors/unauthorized';

interface AuthRequest {
  email: string;
  password: string;
}

interface AuthResponse {
  // id: string;
  // email: string;
  // name: string;
  user: User | undefined;
}

@Injectable()
export class AuthService {
  constructor(private readonly findUser: FindUsers) {}

  // async validateUser(request: AuthRequest): Promise<User | undefined> {
  async validateUser(request: AuthRequest) {
    const { email, password } = request;

    const response = await this.findUser.execute({ email });
    const passwordUser = response.user?.password;

    if (response.user) {
      const isPasswordValid = await bcrypt.compare(password, passwordUser!);

      if (isPasswordValid) {
        return {
          ...response.user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError();
  }
}
