import { User } from '@app/entities/user/user';
import { CurrentUser } from '@infra/decorators/current-user.decorator';
import { IsPublic } from '@infra/decorators/is-public.decorator';
import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../../app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
