import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/transaction/product';
import { ProductsRepository } from '../../repositories/products-repository';

interface SendProductRequest {
  description: string;
  price: number;
}

interface SendProductResponse {
  product: Product;
}

@Injectable()
export class CreateProduct {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(request: SendProductRequest): Promise<SendProductResponse> {
    const { description, price } = request;

    const product = new Product({
      description,
      price,
    });

    await this.productsRepository.create(product);

    return {
      product,
    };
  }
}
