import { IsNotEmpty } from 'class-validator';

export class CreateProductBody {
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  price: number;
}
