import { Product as RawProduct } from '@prisma/client';
import { Product } from '@app/entities/product/product';

export class PrismaProductMapper {
  static toPrisma(product: Product) {
    return {
      id: product.id,
      description: product.description,
      price: product.price,
    };
  }

  static toDomain(raw: RawProduct): Product {
    return new Product(
      {
        description: raw.description,
        price: raw.price,
      },
      raw.id,
    );
  }
}
