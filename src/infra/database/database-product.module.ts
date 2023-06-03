import { Module } from '@nestjs/common';
import { ProductsRepository } from 'src/app/repositories/products-repository';
import { PrismaService } from './prisma/prisma.service';
import { PrismaProductsRepository } from './prisma/repositories/prisma-products-repository';

@Module({
  providers: [
    PrismaService,
    {
      provide: ProductsRepository,
      useClass: PrismaProductsRepository,
    },
  ],
  exports: [ProductsRepository],
})
export class DatabaseProductModule {}
