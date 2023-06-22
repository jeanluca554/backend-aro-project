import { Product } from '@app/entities/product/product';

export class ProductViewModel {
  static toHTTP(product: Product) {
    return {
      id: product.id,
      description: product.description,
      price: product.price,
    };
  }
}
