import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@app/entities/user/user';
import { AuthRequest } from '@app/models/authRequest';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<AuthRequest>();

    return request.user;
  },
);
