import { IsInt, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TransactionStatus {
  @IsInt()
  Id: number;

  @IsString()
  Code: string;

  @IsString()
  Name: string;
}

class CheckingAccounts {
  @IsString()
  Description: string;

  @IsNotEmpty()
  Amount: number;

  @IsNotEmpty()
  Tax: number;

  @IsNotEmpty()
  IsTransferred: boolean;

  @IsString()
  ReleaseDate: string;
}

class PaymentMethod {
  @IsInt()
  Id: number;
  @IsString()
  Code: string;
  @IsString()
  Name: string;
  @IsNotEmpty()
  Show: boolean;
}

export class CreateTransactionNotificationBody {
  @IsInt()
  IdTransaction: number;

  @ValidateNested()
  @Type(() => TransactionStatus)
  TransactionStatus: TransactionStatus;

  // @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CheckingAccounts)
  CheckingAccounts: CheckingAccounts[];

  @ValidateNested()
  @Type(() => PaymentMethod)
  PaymentMethod: PaymentMethod;

  @IsString()
  Application: string;

  @IsString()
  Vendor: string;

  @IsNotEmpty()
  Amount: number;

  @IsString()
  PaymentDate: string;

  @IsString()
  IncluedDate: string;

  @IsInt()
  InstallmentQuantity: number;

  @IsString()
  SecretKey: string;

  @IsString()
  Reference: string;
}
