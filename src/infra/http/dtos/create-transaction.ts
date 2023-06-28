import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
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

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(3)
  creditCardInstallmentQuantity: number;

  @IsString()
  creditCardIdentity: string;

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
  customerCategory: string;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  discount: number;
}
