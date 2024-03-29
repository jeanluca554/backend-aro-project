import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';

import { CreateProduct } from '@app/use-cases/product/create-product';
import { GetProducts } from '@app/use-cases/product/get-products';
import { CreateProductBody } from '../dtos/create-product-body';
import { ProductViewModel } from '../view-models/product-view-model';
import { IsPublic } from '@infra/decorators/is-public.decorator';

@Controller('product')
export class ProductsController {
  constructor(private createProduct: CreateProduct, private getProducts: GetProducts) {}

  @Post()
  async create(@Body() body: CreateProductBody) {
    // console.log(body)
    const { description, price } = body;

    const { product } = await this.createProduct.execute({
      description,
      price,
    });

    return { product: ProductViewModel.toHTTP(product) };
  }

  @Get()
  async findAll() {
    const { products } = await this.getProducts.execute();

    return {
      products: products.map(ProductViewModel.toHTTP),
    };
  }
}
