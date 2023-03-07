import { Injectable } from '@nestjs/common';
import { User } from '@app/entities/user/user';
import { UsersRepository } from '@app/repositories/user-repository';
import * as bcrypt from 'bcrypt';

interface SendAuthRequest {
  email: string;
  password: string;
}

interface SendUsersResponse {
  // id: string;
  // email: string;
  // name: string;
  user: User;
}

@Injectable()
export class AuthService {
  async validateUser(email: string, password: string) {
    throw new Error('Method not implemented');
    // const { email, password } = request;

    // const encryptedPassword = await bcrypt.hash(password, 10);

    // const user = new User({
    //   email,
    //   password: encryptedPassword,
    //   name,
    // });

    // await this.usersRepository.create(user);

    // return {
    //   user,
    // };
  }
}
