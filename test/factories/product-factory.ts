import { Product, ProductProps } from '@app/entities/transaction/product';

type Override = Partial<ProductProps>;

export function makeProduct(override: Override = {}) {
  return new Product({
    description: 'Tribunal do Teste',
    price: 500,
    ...override,
  });
}
