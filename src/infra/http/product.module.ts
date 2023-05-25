import { Module } from '@nestjs/common';
import { DatabaseProductModule } from '../database/database-product.module';
import { ProductsController } from './controllers/product.controller';
import { CreateProduct } from 'src/app/use-cases/product/create-product';

@Module({
  imports: [DatabaseProductModule],
  controllers: [ProductsController],
  providers: [CreateProduct],
})
export class ProductModule {}
