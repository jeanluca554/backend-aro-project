import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthRequest } from '@app/models/authRequest';
import { AuthService } from '@app/use-cases/auth/auth.service';
import { LocalAuthGuard } from '@infra/guards/local-auth.guard';

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
