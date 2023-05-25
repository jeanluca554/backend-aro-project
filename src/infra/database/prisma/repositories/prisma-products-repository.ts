import { Injectable } from '@nestjs/common';
import { Product } from '@app/entities/transaction/product';
import { ProductsRepository } from '@app/repositories/products-repository';
import { PrismaService } from '../prisma.service';
import { PrismaProductMapper } from '../mappers/prisma-product-mapper';

@Injectable()
export class PrismaProductsRepository implements ProductsRepository {
  constructor(private prismaService: PrismaService) {}

  async create(product: Product): Promise<void> {
    const raw = PrismaProductMapper.toPrisma(product);

    await this.prismaService.product.create({
      data: raw,
    });
  }
}
