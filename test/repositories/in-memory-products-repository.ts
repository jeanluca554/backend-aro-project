import { Product } from '@app/entities/transaction/product';
import { ProductsRepository } from '@app/repositories/products-repository';

export class InMemoryProductsRepository implements ProductsRepository {
  public products: Product[] = [];

  async create(product: Product) {
    this.products.push(product);
  }
}
