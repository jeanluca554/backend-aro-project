import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/user-repository';
import * as bcrypt from 'bcrypt';

interface SendUsersRequest {
  email: string;
  password: string;
  name: string;
}

interface SendUsersResponse {
  // id: string;
  // email: string;
  // name: string;
  user: User;
}

@Injectable()
export class CreateUser {
  constructor(private usersRepository: UsersRepository) {}

  async execute(request: SendUsersRequest): Promise<SendUsersResponse> {
    const { email, password, name } = request;

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: encryptedPassword,
      name,
    });

    await this.usersRepository.create(user);

    return {
      user,
    };
  }
}
