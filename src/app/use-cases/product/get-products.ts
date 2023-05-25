import { Injectable } from '@nestjs/common';
import { Product } from '../../entities/transaction/product';
import { ProductsRepository } from '../../repositories/products-repository';

interface GetProductsResponse {
  products: Product[];
}

@Injectable()
export class GetProducts {
  constructor(private productsRepository: ProductsRepository) {}

  async execute(): Promise<GetProductsResponse> {
    const products = await this.productsRepository.findMany();

    return {
      products,
    };
  }
}
