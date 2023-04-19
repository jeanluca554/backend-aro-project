export interface TransactionSafe2PayInterface {
  IsSandbox: boolean;
  Application: string;
  Vendor: string;
  CallbackUrl: string;
  PaymentMethod: string;
  Customer: Customer;
  Products: Product[];
  PaymentObject: PaymentObject;
}

interface Customer {
  Name: string;
  Identity: string;
  Phone: string;
  Email: string;
  Address: Address;
}

interface Address {
  ZipCode: string;
  Street: string;
  Number: string;
  Complement: string;
  District: string;
  CityName: string;
  StateInitials: string;
  CountryName: string;
}

interface Product {
  Code: string;
  Description: string;
  UnitPrice: number;
  Quantity: number;
}

interface PaymentObject {
  Holder: string;
  CardNumber: string;
  ExpirationDate: string;
  SecurityCode: string;
  InstallmentQuantity: number;
  SoftDescriptor: string;
}
