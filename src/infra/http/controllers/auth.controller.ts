import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from '@app/use-cases/user/create-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';
import { LocalAuthGuard } from '@infra/guards/local-auth.guard';

@Controller()
export class UserController {
  constructor(private createUser: CreateUser) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Body() body: CreateUserBody) {
    const { email, name, password } = body;

    const { user } = await this.createUser.execute({
      email,
      password,
      name,
    });

    return { user: UserViewModel.toHTTP(user) };
  }

  // async login(@Body() body: CreateUserBody) {
  //   const { email, name, password } = body;

  //   const { user } = await this.createUser.execute({
  //     email,
  //     password,
  //     name,
  //   });

  //   return { user: UserViewModel.toHTTP(user) };
  // }
}
