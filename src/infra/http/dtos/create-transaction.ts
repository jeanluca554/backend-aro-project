import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateTransactionBody {
  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsString()
  creditCardHolder: string;

  @IsString()
  creditCardCardNumber: string;

  @IsString()
  creditCardExpirationDate: string;

  @IsString()
  creditCardSecurityCode: string;

  @IsInt()
  creditCardInstallmentQuantity: number;

  @IsString()
  courseCode: string;

  @IsString()
  courseDescription: string;

  @IsInt()
  courseUnitPrice: number;

  @IsString()
  addressZipCode: string;

  @IsString()
  addressStreet: string;

  @IsString()
  addressComplement: string;

  @IsString()
  addressNumber: string;

  @IsString()
  addressDistrict: string;

  @IsString()
  addressStateInitials: string;

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
}
