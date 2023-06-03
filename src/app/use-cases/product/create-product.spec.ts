import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { CreateProduct } from './create-product';

describe('Send notification', () => {
  it('should be able to create a product', async () => {
    const productsRepository = new InMemoryProductsRepository();
    const createProduct = new CreateProduct(productsRepository);

    const { product } = await createProduct.execute({
      description: 'This is a notification',
      price: 500,
    });

    expect(productsRepository.products).toHaveLength(1);
    expect(productsRepository.products[0]).toEqual(product);
  });
});
