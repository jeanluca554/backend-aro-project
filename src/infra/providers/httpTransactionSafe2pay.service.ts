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
    "PaymentMethod": "2",
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
        "UnitPrice": data.courseUnitPrice,
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

@Injectable()
export class HttpTransactionSafe2Pay {
  constructor(private readonly httpService: HttpService) {}

  async processAxios(
    request: TransactionRequest,
  ): Promise<TransactionResponse> {
    const url = 'https://payment.safe2pay.com.br/v2/Payment';

    const config = {
      headers: {
        'x-api-key': process.env.SAFE_2_PAY_KEY,
        'content-type': 'application/json',
      },
    };

    const formattedData = formatData(request);

    const paymentResponse = await lastValueFrom(
      this.httpService.post(url, formattedData, config),
    );

    const paymentResponseFormatted = paymentResponse.data;
    console.log(paymentResponseFormatted);

    return paymentResponseFormatted;
  }
}
