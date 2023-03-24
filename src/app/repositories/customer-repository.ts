import { Customer } from '@app/entities/transaction/customer';

export abstract class CustomerRepository {
  abstract create(customer: Customer): Promise<void>;
}
