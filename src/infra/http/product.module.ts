import { Module } from '@nestjs/common';
import { DatabaseProductModule } from '../database/database-product.module';
import { ProductsController } from './controllers/product.controller';
import { CreateProduct } from 'src/app/use-cases/product/create-product';
import { GetProducts } from 'src/app/use-cases/product/get-products';

@Module({
  imports: [DatabaseProductModule],
  controllers: [ProductsController],
  providers: [CreateProduct, GetProducts],
})
export class ProductModule {}
