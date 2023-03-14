import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionBody {
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
}
