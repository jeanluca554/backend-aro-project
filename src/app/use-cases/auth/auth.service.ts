import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/user-repository';
import * as bcrypt from 'bcrypt';
import { FindUsers } from '../user/find-user';
import { UnauthorizedError } from '../errors/unauthorized';
import { PrismaUserMapper } from '@infra/database/prisma/mappers/prisma-user-mapper';
import { UserPayload } from '@app/models/UserPayload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from '@app/models/UserToken';

interface AuthRequest {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly findUser: FindUsers,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
      user: {
        sub: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }

  async validateUser(request: AuthRequest) {
    const { email, password } = request;

    const response = await this.findUser.execute({ email });
    const passwordUser = response.user?.password;

    if (response && passwordUser) {
      const isPasswordValid = await bcrypt.compare(password, passwordUser);

      if (isPasswordValid && response.user !== null) {
        return PrismaUserMapper.toController(response.user);
      }
    }

    throw new UnauthorizedError();
  }
}
