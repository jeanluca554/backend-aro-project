import { User } from '@app/entities/user/user';
import { Request } from 'express';

export interface AuthRequest extends Request {
  user: User;
}
