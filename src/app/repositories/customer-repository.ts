import { Customer } from '@app/entities/customer/customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
}
