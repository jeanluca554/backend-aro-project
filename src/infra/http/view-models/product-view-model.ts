import { Product } from '@app/entities/transaction/product';

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      description: product.description,
      price: product.price,
    };
  }
}
