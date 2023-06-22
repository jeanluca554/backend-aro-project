import { Injectable } from '@nestjs/common';
import { Address } from '@app/entities/customer/address';
import { Customer } from '@app/entities/customer/customer';
import { CustomerRepository } from '../../repositories/customer-repository';

interface CreateCustomerRequest {
  addressCity: string;
  addressComplement: string;
  addressDistrict: string;
  addressNumber: string;
  addressStateInitials: string;
  addressStreet: string;
  addressZipCode: string;
  email: string;
  identity: string;
  name: string;
  phone: string;
  category: string;
}

interface CreateCustomerResponse {
  customer: Customer;
}

@Injectable()
export class CreateCustomerTransaction {
  constructor(private customerRepository: CustomerRepository) {}

  async execute(request: CreateCustomerRequest): Promise<CreateCustomerResponse> {
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
    } = request;

    const customer = new Customer(
      {
        address: new Address({
          city: addressCity,
          complement: addressComplement,
          district: addressDistrict,
          number: addressNumber,
          stateInitials: addressStateInitials,
          street: addressStreet,
          zipCode: addressZipCode,
        }),
        email,
        name,
        phone,
        category,
      },
      identity,
    );
    console.log(customer);
    console.log(customer.address);

    await this.customerRepository.create(customer);

    return {
      customer,
    };
  }
}
