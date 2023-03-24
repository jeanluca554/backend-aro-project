import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  Max,
  IsPositive,
} from 'class-validator';

export class CreateTransactionBody {
  @IsString()
  creditCardHolder: string;

  @IsString()
  creditCardCardNumber: string;

  @IsString()
  creditCardExpirationDate: string;

  @IsString()
  creditCardSecurityCode: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(3)
  creditCardInstallmentQuantity: number;

  @IsNotEmpty()
  @IsString()
  courseCode: string;

  @IsNotEmpty()
  @IsString()
  courseDescription: string;

  @IsNotEmpty()
  @IsPositive()
  @IsInt()
  courseUnitPrice: number;

  @IsNotEmpty()
  @IsString()
  addressZipCode: string;

  @IsNotEmpty()
  @IsString()
  addressStreet: string;

  @IsNotEmpty()
  @IsString()
  addressComplement: string;

  @IsNotEmpty()
  @IsString()
  addressNumber: string;

  @IsNotEmpty()
  @IsString()
  addressDistrict: string;

  @IsNotEmpty()
  @IsString()
  addressStateInitials: string;

  @IsNotEmpty()
  @IsString()
  addressCity: string;

  @IsNotEmpty()
  @IsString()
  customerName: string;

  @IsNotEmpty()
  @IsString()
  customerIdentity: string;

  @IsNotEmpty()
  @IsString()
  customerPhone: string;

  @IsNotEmpty()
  @IsEmail()
  customerEmail: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  discount: number;
}
