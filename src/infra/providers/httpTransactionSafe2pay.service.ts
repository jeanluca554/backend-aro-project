import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

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

export interface TransactionResponse {
  ResponseDetail?: {
    IdTransaction?: string;
    Description?: string;
    Message?: string;
    Status?: number;
    Token?: string;
    Tid?: string;
    AuthorizationCode?: string;
    QrCode?: string;
    Key?: string;
  };
  HasError: boolean;
  ErrorCode?: string;
  Error?: string;
}

function formatData(data: TransactionRequest) {
  const response = {
    /*eslint-disable*/
    "IsSandbox": false,
    "Application": "Pagamento Safe2Pay",
    "Vendor": "Instituto Aro",
    "CallbackUrl": "https://callbacks.exemplo.com.br/api/Notify",
    "PaymentMethod": data.paymentMethod,
    "Customer": {
      "Name": data.customerName,
      "Identity": data.customerIdentity,
      "Phone": data.customerPhone,
      "Email": data.customerEmail,
      "Address": {
        "ZipCode": data.addressZipCode,
        "Street": data.addressStreet,
        "Number": data.addressNumber,
        "Complement": data.addressComplement,
        "District": data.addressDistrict,
        "CityName": data.addressCity,
        "StateInitials": data.addressStateInitials,
        "CountryName": "Brasil"
      }
    },
    "Products": [
      {
        "Code": data.courseCode,
        "Description": data.courseDescription,
        // "UnitPrice": data.courseUnitPrice,
        "UnitPrice": 10.00,
        "Quantity": 1
      }
    ],
    "PaymentObject": {
      "Holder": data.creditCardHolder,
      "CardNumber": data.creditCardCardNumber,
      "ExpirationDate": data.creditCardExpirationDate,
      "SecurityCode": data.creditCardSecurityCode,
      "InstallmentQuantity": data.creditCardInstallmentQuantity,
      "SoftDescriptor": "Instituto Aro"
    }
    /*eslint-enable*/
  };

  return response;
}

function formatPixData(data: TransactionRequest) {
  const response = {
    /*eslint-disable*/
    "IsSandbox": false,
    "Application": "Pagamento Safe2Pay",
    "Vendor": "Instituto Aro",
    "CallbackUrl": "https://callbacks.exemplo.com.br/api/Notify",
    "PaymentMethod": data.paymentMethod,
    "Customer": {
      "Name": data.customerName,
      "Identity": data.customerIdentity,
      "Phone": data.customerPhone,
      "Email": data.customerEmail,
      "Address": {
        "ZipCode": data.addressZipCode,
        "Street": data.addressStreet,
        "Number": data.addressNumber,
        "Complement": data.addressComplement,
        "District": data.addressDistrict,
        "CityName": data.addressCity,
        "StateInitials": data.addressStateInitials,
        "CountryName": "Brasil"
      }
    },
    "Products": [
      {
        "Code": data.courseCode,
        "Description": data.courseDescription,
        "UnitPrice": 10.00,
        // "UnitPrice": data.courseUnitPrice,
        "Quantity": 1
      }
    ],
    /*eslint-enable*/
  };

  return response;
}

@Injectable()
export class HttpTransactionSafe2Pay {
  constructor(private readonly httpService: HttpService) {}

  async processAxios(request: TransactionRequest): Promise<TransactionResponse> {
    const url = 'https://payment.safe2pay.com.br/v2/Payment';

    const config = {
      headers: {
        'x-api-key': process.env.SAFE_2_PAY_KEY,
        'content-type': 'application/json',
      },
    };

    let formattedData = {};

    if (request.paymentMethod === '6') {
      //Use this on production
      //formattedData = formatPixData(request);

      return (formattedData = {
        /*eslint-disable*/
        "ResponseDetail": {
          "IdTransaction": "1044125",
          "Status": 1,
          "Message": "Pagamento Pendente",
          "Description": "Estamos aguardando a transferência do valor. Após a confirmação, o pagamento pode levar até 10 segundos para ser compensado.",
          "QrCode": "https://repository.safe2pay.com.br/qr/cb2b8a2f-464a-4323-a77d-b30370038a6a",
          "Key": "00020126580014br.gov.bcb.pix0136123e4567-e12b-12d1-a456-426655440000 5204000053039865802BR5913Fulano de Tal6008BRASILIA62070503***63041D3D"
        },
        "HasError": false
        /*eslint-enable*/
      });
    }

    if (request.paymentMethod === '2') {
      formattedData = formatData(request);
    }

    const paymentResponse = await lastValueFrom(
      this.httpService.post(url, formattedData, config),
    );

    const paymentResponseFormatted = paymentResponse.data;
    console.log(paymentResponseFormatted);

    return paymentResponseFormatted;
  }
}
