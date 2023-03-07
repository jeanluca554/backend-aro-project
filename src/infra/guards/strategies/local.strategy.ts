import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '@app/use-cases/auth/auth.service';

interface ValidateUser {
  email: string;
  password: string;
}

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  // validate(data: ValidateUser) {
  // const { email, password } = data;
  validate(email: string, password: string) {
    return this.authService.validateUser({ email, password });
  }
}

// @Injectable()
// export class LocalStrategy extends PassportStrategy(Strategy) {
//   constructor(private authService: AuthService) {
//     super({ usernameField: 'email' });
//   }

//   validate(email: string, password: string) {
//     return this.authService.validateUser(email, password);
//   }
// }
