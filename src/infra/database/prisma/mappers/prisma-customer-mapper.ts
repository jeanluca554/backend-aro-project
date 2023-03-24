// import { Notification as RawNotification } from '@prisma/client';
import { Customer } from '@app/entities/transaction/customer';

export class PrismaCustomerMapper {
  static toPrisma(customer: Customer) {
    return {
      // id: customer.id,
      email: customer.email,
      identity: customer.id,
      name: customer.name,
      phone: customer.phone,
      addressCity: customer.address.city,
      addressComplement: customer.address.complement,
      addressDistrict: customer.address.district,
      addressNumber: customer.address.number,
      addressStateInitials: customer.address.number,
      addressStreet: customer.address.street,
      addressZipCode: customer.address.zipCode,
    };
  }

  // static toDomain(raw: RawTransaction): Transaction {
  //   return new Transaction(
  //     {
  //       paymentMethod: raw.paymentMethod,
  //     //   creditCardHolder: raw.,
  //     // creditCardCardNumber: raw.,
  //     // creditCardExpirationDate: raw.,
  //     // creditCardSecurityCode: raw.,
  //     creditCardInstallmentQuantity: raw.,
  //     addressCity: raw.,
  //     addressComplement: raw.,
  //     addressDistrict: raw.,
  //     addressNumber: raw.,
  //     addressStateInitials: raw.,
  //     addressStreet: raw.,
  //     addressZipCode: raw.,
  //     courseCode: raw.,
  //     courseDescription: raw.,
  //     courseUnitPrice: raw.,
  //     customerEmail: raw.,
  //     customerIdentity: raw.,
  //     customerName: raw.,
  //     customerPhone: raw.,
  //       canceledAt: raw.canceledAt,
  //       createdAt: raw.createdAt,
  //     },
  //     raw.id,
  //   );
  // }
}
