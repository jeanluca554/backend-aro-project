import { Injectable } from '@nestjs/common';
import { Customer } from '@app/entities/transaction/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { PrismaService } from '../prisma.service';
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(customer: Customer): Promise<void> {
    const raw = PrismaCustomerMapper.toPrisma(customer);

    await this.prismaService.customer.create({
      data: raw,
    });
  }
}
