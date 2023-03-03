import { Body, Controller, Post } from '@nestjs/common';
import { CreateUser } from '@app/use-cases/user/create-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post()
  async create(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const { user } = await this.createUser.execute({
      email,
      password,
      name,
    });

    return { user: UserViewModel.toHTTP(user) };
  }
}
