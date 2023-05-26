import { Transaction, TransactionProps } from '@app/entities/transaction/transaction';
import { Customer } from '@app/entities/transaction/customer';
import { Address } from '@app/entities/transaction/address';
import { Product } from '@app/entities/transaction/product';

type Override = Partial<TransactionProps>;

export function makeTransaction(override: Override = {}) {
  const address = new Address({
    city: 'City',
    complement: '',
    district: 'District example',
    number: '100',
    stateInitials: 'SP',
    street: 'Street example',
    zipCode: '1246546566',
  });

  const customer = new Customer(
    {
      address: address,
      email: 'test@gmail.com',
      name: 'Customer Name Example',
      phone: '9999999999',
    },
    '693.138.520-80',
  );

  const product = new Product({
    description: 'Tribunal do Júri',
    price: 400,
  });

  return new Transaction({
    paymentMethod: '2',
    customer,
    message: 'Pagamento autorizado',
    status: 3,
    installments: 1,
    description: 'O seu pagamento foi autorizado pela operadora do cartão de crédito.',
    hasError: false,
    product,
    ...override,
  });
}
