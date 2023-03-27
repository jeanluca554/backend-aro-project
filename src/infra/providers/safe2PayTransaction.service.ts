import { Injectable } from '@nestjs/common';
import { TransactionService } from './transaction.service';

/* eslint-disable @typescript-eslint/no-var-requires */
const safe2pay = require('safe2pay');

interface TransactionRequest {
  paymentMethod: string;
  creditCardHolder?: string;
  creditCardCardNumber?: string;
  creditCardExpirationDate?: string;
  creditCardSecurityCode?: string;
  creditCardInstallmentQuantity?: number;
  addressCity: string;
  addressComplement: string;
  addressDistrict: string;
  addressNumber: string;
  addressStateInitials: string;
  addressStreet: string;
  addressZipCode: string;
  courseCode: string;
  courseDescription: string;
  courseUnitPrice: number;
  customerEmail: string;
  customerIdentity: string;
  customerName: string;
  customerPhone: string;
}

// export interface TransactionResponse extends Error {
export interface TransactionResponse {
  ResponseDetail?: {
    IdTransaction?: string;
    Description?: string;
    Message?: string;
    Status?: number;
    Token?: string;
    Tid?: string;
    AuthorizationCode?: string;
  };
  HasError: boolean;
  ErrorCode: string;
  Error: string;
}

@Injectable()
// should  implements TransactionService
export class Safe2PayTransactionService {
  async process(request: TransactionRequest) {
    const {
      paymentMethod,
      creditCardHolder,
      creditCardCardNumber,
      creditCardExpirationDate,
      creditCardSecurityCode,
      creditCardInstallmentQuantity,
      addressCity,
      addressComplement,
      addressDistrict,
      addressNumber,
      addressStateInitials,
      addressStreet,
      addressZipCode,
      courseCode,
      courseDescription,
      courseUnitPrice,
      customerEmail,
      customerIdentity,
      customerName,
      customerPhone,
    } = request;

    safe2pay.environment.setApiKey(process.env.SAFE_2_PAY_KEY);

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
    payload.Application = 'Pagamento Safe2Pay';

    //Nome do vendedor
    payload.Vendor = 'Instituto Aro';

    //Url de callback
    payload.CallbackUrl = 'https://callbacks.exemplo.com.br/api/Notify';

    //Código da forma de pagamento
    // 1 - Boleto bancário
    // 2 - Cartão de crédito
    // 3 - Criptomoeda
    // 4 - Cartão de débito
    // 10 - Débito em conta
    payload.PaymentMethod = paymentMethod;

    payload.Reference = 'Teste';

    //Informa o objeto de pagamento
    //Objeto de pagamento - para cartão de crédito
    const creditCard = new CreditCard();
    creditCard.Holder = creditCardHolder;
    creditCard.CardNumber = creditCardCardNumber;
    creditCard.ExpirationDate = creditCardExpirationDate;
    creditCard.SecurityCode = creditCardSecurityCode;
    creditCard.InstallmentQuantity = creditCardInstallmentQuantity;

    payload.PaymentObject = creditCard;

    //Lista de produtos incluídos na cobrança
    payload.Products.push(
      new Product(courseCode, courseDescription, courseUnitPrice, 1),
    );

    //Dados do endereço do cliente
    const address = new Address();
    address.ZipCode = addressZipCode;
    address.Street = addressStreet;
    address.Complement = addressComplement;
    address.Number = addressNumber;
    address.District = addressDistrict;
    address.StateInitials = addressStateInitials;
    address.CityName = addressCity;
    address.CountryName = 'Brasil';

    //Dados do cliente
    const customer = new Customer();
    customer.Name = customerName;
    customer.Identity = customerIdentity;
    customer.Phone = customerPhone;
    customer.Email = customerEmail;
    customer.Address = address;

    payload.Customer = customer;

    let paymentResponse: TransactionResponse = {
      // name: '',
      // message: '',
      HasError: false,
      Error: '',
      ErrorCode: '',
    };

    await PaymentRequest.Payment(payload).then(
      (result: TransactionResponse) => {
        paymentResponse = result;
      },
      function (err: Error) {
        console.log(err);
      },
    );

    return paymentResponse;
  }
}
