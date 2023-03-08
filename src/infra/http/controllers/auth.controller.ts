import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { CreateUser } from '@app/use-cases/user/create-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { UserViewModel } from '../view-models/user-view-model';
import { LocalAuthGuard } from '@infra/guards/local-auth.guard';
import { AuthService } from '@app/use-cases/auth/auth.service';
import { AuthRequest } from '@app/models/authRequest';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: AuthRequest) {
    // console.log(req.user);

    return this.authService.login(req.user);
  }
}
