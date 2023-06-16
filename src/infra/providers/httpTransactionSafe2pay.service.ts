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
  ResponseDetail: {
    IdTransaction: string | null;
    Description: string | null;
    Message: string | null;
    Status: number | null;
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
    "CallbackUrl": `${process.env.DATABASE_URL}/notify`,
    "PaymentMethod": data.paymentMethod,
    "Reference": "Pagamento Pix",
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

      //Use this on sandbox
      return (formattedData = {
        /*eslint-disable*/
        "ResponseDetail": {
          "IdTransaction": "56124007",
          "Status": 1,
          "Message": "Pagamento Pendente",
          "Description": "Estamos aguardando a transferência do valor. Após a confirmação, o pagamento pode levar até 5 minutos para ser compensado.",
          "QrCode": "https://images.safe2pay.com.br/pix/6c83f56c2f894cdb8f9bdaa40ccb8420.png",
          "Key": "00020101021226850014br.gov.bcb.pix2563qrcodepix.bb.com.br/pix/v2/c53c1180-4157-429e-ac89-76e732b76586520400005303986540510.005802BR5908SAFE2PAY6012PORTO ALEGRE62070503***630486E5"
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

    return {
      HasError: true,
      Error: 'Error httpTransactionSafe2pay',
      ResponseDetail: { Description: null, Message: null, Status: null, IdTransaction: null },
    };
  }
}
