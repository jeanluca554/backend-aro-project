import { Injectable } from '@nestjs/common';

/* eslint-disable @typescript-eslint/no-var-requires */
const safe2pay = require('safe2pay');

@Injectable()
export class Safe2PayProvider {
  async process() {
    safe2pay.environment.setApiKey(process.env.SAFE_2_PAY_KEY);
    //api
    const PaymentRequest = safe2pay.api.PaymentRequest;

    const CreditCard = safe2pay.model.payment.CreditCard;

    const Transaction = safe2pay.model.transaction.Transaction;
    const Customer = safe2pay.model.general.Customer;
    const Product = safe2pay.model.general.Product;
    const Address = safe2pay.model.general.Address;

    //Inicializar método de pagamento
    const payload = new Transaction();
    //Ambiente de homologação
    payload.IsSandbox = true;
    //Descrição geral
    payload.Application = 'Teste SDK  NodeJS';
    //Nome do vendedor
    payload.Vendor = 'João da Silva';
    //Url de callback
    payload.CallbackUrl = 'https://callbacks.exemplo.com.br/api/Notify';
    //Código da forma de pagamento
    // 1 - Boleto bancário
    // 2 - Cartão de crédito
    // 3 - Criptomoeda
    // 4 - Cartão de débito
    // 10 - Débito em conta
    payload.PaymentMethod = '2';

    //Informa o objeto de pagamento

    //Objeto de pagamento - para cartão de crédito
    const creditCard = new CreditCard();
    creditCard.Holder = 'João da Silva';
    creditCard.CardNumber = '4024007153763199';
    creditCard.ExpirationDate = '12/2023';
    creditCard.SecurityCode = '241';

    payload.PaymentObject = creditCard;

    //Lista de produtos incluídos na cobrança
    payload.Products.push(new Product('001', 'Teste 1', 1.99, 10));
    payload.Products.push(new Product('002', 'Teste 1', 1.99, 10));
    payload.Products.push(new Product('002', 'Teste 1', 1.99, 10));

    //Dados do endereço do cliente
    const address = new Address();
    address.ZipCode = '90670090';
    address.Street = 'Logradouro';
    address.Complement = 'Complemento';
    address.Number = '123';
    address.District = 'Higienopolis';
    address.StateInitials = 'RS';
    address.CityName = 'Porto Alegre';
    address.CountryName = 'Brasil';

    //Dados do cliente
    const customer = new Customer();
    customer.Name = 'João da silva';
    customer.Identity = '18978393080';
    customer.Phone = '51999999999';
    customer.Email = 'safe2pay@safe2pay.com.br';
    customer.Address = address;

    payload.Customer = customer;

    await PaymentRequest.Payment(payload).then(
      function (result) {
        //...
        // console.log(payload);
        console.log(result);
      },
      function (err) {
        //...
        console.log(err);
      },
    );
    // ...
  }
}
