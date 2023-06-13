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
    pixQrCode?: string;
    pixKey?: string;
  };
  HasError: boolean;
  ErrorCode?: string;
  Error?: string;
}

function formatData(data: TransactionRequest) {
  const response = {
    /*eslint-disable*/
    "IsSandbox": true,
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
    "Reference": "TESTE",
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
  };
  /*eslint-enable*/
  console.log(response);

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
      // formattedData = formatPixData(request);

      return (formattedData = {
        /*eslint-disable*/
        "ResponseDetail": {
          "IdTransaction": "1044125",
          "Status": 1,
          "Message": "Pagamento Pendente",
          "Description": "Estamos aguardando a transferência do valor. Após a confirmação, o pagamento pode levar até 5 minutos para ser compensado.",
          "pixQrCode": "https://images.safe2pay.com.br/pix/d61a1c3bd1c8460bb15684a7e1bf0cc6.png",
          "pixKey": "00020101021226850014br.gov.bcb.pix2563qrcodepix.bb.com.br/pix/v2/f418c013-1010-4437-ab2b-8eea015f559a520400005303986540510.005802BR5908SAFE2PAY6012PORTO ALEGRE62070503***63043EC3"
        },
        "HasError": false
        /*eslint-enable*/
      });
    }

    if (request.paymentMethod === '2') {
      formattedData = formatData(request);
    }

    try {
      const paymentResponse = await lastValueFrom(
        this.httpService.post(url, formattedData, config),
      );

      const paymentResponseFormatted = paymentResponse.data;
      console.log(paymentResponseFormatted);
      // console.log(paymentResponse);

      return paymentResponseFormatted;
    } catch (error) {
      console.log(error);
    }

    return { HasError: true, Error: 'Error httpTransactionSafe2pay' };
  }
}
