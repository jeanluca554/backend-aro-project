import { makeProduct } from '@test/factories/product-factory';
import { InMemoryProductsRepository } from '@test/repositories/in-memory-products-repository';
import { GetProducts } from './get-products';

describe('Get products', () => {
  it('should be able to get products', async () => {
    const productsRepository = new InMemoryProductsRepository();
    const getProducts = new GetProducts(productsRepository);

    await productsRepository.create(makeProduct());
    await productsRepository.create(makeProduct());
    await productsRepository.create(makeProduct());

    const { products } = await getProducts.execute();

    expect(products).toHaveLength(3);
  });
});
