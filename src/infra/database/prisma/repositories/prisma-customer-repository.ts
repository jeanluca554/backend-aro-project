import { Injectable } from '@nestjs/common';
import { Customer } from '@app/entities/transaction/customer';
import { CustomerRepository } from '@app/repositories/customer-repository';
import { PrismaService } from '../prisma.service';
import { PrismaCustomerMapper } from '../mappers/prisma-customer-mapper';

@Injectable()
export class PrismaCustomerRepository implements CustomerRepository {
  constructor(private prismaService: PrismaService) {}

  async create(customer: Customer): Promise<void> {
    // const raw = PrismaCustomerMapper.toPrisma(customer);
    const {
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      email,
      identity,
      name,
      phone,
      category,
    } = PrismaCustomerMapper.toPrisma(customer);

    await this.prismaService.customer.upsert({
      where: { identity },
      update: {
        addressCity,
        addressComplement,
        addressDistrict,
        addressNumber,
        addressStateInitials,
        addressStreet,
        addressZipCode,
        name,
        phone,
        category,
      },
      create: {
        addressCity,
        addressComplement,
        addressDistrict,
        addressNumber,
        addressStateInitials,
        addressStreet,
        addressZipCode,
        email,
        identity,
        name,
        phone,
        category,
      },
    });
  }
}
