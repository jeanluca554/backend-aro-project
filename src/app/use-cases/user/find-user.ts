import { User } from '@app/entities/user/user';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from '@app/repositories/user-repository';

interface FindUsersRequest {
  email: string;
}

interface FindUsersResponse {
  user: User | null;
}

@Injectable()
export class FindUsers {
  constructor(private usersRepository: UsersRepository) {}

  // async execute(email: string): Promise<FindUsersResponse> {
  async execute(request: FindUsersRequest): Promise<FindUsersResponse> {
    const { email } = request;
    const user = await this.usersRepository.findByEmail(email);
    return {
      user,
    };
  }
}
