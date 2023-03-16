import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUser } from '@app/use-cases/user/create-user';
import { FindUsers } from '@app/use-cases/user/find-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';

@Controller('user')
export class UserController {
  constructor(private createUser: CreateUser, private findUser: FindUsers) {}

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

  @Get('from/:email')
  async getUserFromEmail(@Param('email') email: string) {
    const { user } = await this.findUser.execute({ email });

    if (user !== null) {
      return UserViewModel.toHTTP(user);
    }
    return {
      user,
    };
  }
}
