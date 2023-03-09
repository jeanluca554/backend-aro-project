import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginRequestBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
