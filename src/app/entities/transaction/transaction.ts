import { Replace } from 'src/helpers/Replace';
import { v4 as randomUUID } from 'uuid';

export interface TransactionProps {
  paymentMethod: string;
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
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Transaction {
  private _id: string;
  private props: TransactionProps;

  constructor(
    props: Replace<TransactionProps, { createdAt?: Date }>,
    id?: string,
  ) {
    this._id = id ?? randomUUID();
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  //futuramente exportar o id para uma classe "BaseEntity". Então extendê-la em todas as classes, pois todas terão um ID e o método Getter

  public get id(): string {
    return this._id;
  }

  public cancel() {
    this.props.canceledAt = new Date();
  }

  public get canceledAt(): Date | null | undefined {
    return this.props.canceledAt;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set paymentMethod(paymentMethod: string) {
    this.props.paymentMethod = paymentMethod;
  }

  public get paymentMethod(): string {
    return this.props.paymentMethod;
  }

  public set addressCity(addressCity: string) {
    this.props.addressCity = addressCity;
  }

  public get addressCity(): string {
    return this.props.addressCity;
  }

  public set addressComplement(addressComplement: string) {
    this.props.addressComplement = addressComplement;
  }

  public get addressComplement(): string {
    return this.props.addressComplement;
  }

  public set addressDistrict(addressDistrict: string) {
    this.props.addressDistrict = addressDistrict;
  }

  public get addressDistrict(): string {
    return this.props.addressDistrict;
  }

  public set addressNumber(addressNumber: string) {
    this.props.addressNumber = addressNumber;
  }

  public get addressNumber(): string {
    return this.props.addressNumber;
  }

  public set addressStateInitials(addressStateInitials: string) {
    this.props.addressStateInitials = addressStateInitials;
  }

  public get addressStateInitials(): string {
    return this.props.addressStateInitials;
  }

  public set addressStreet(addressStreet: string) {
    this.props.addressStreet = addressStreet;
  }

  public get addressStreet(): string {
    return this.props.addressStreet;
  }

  public set addressZipCode(addressZipCode: string) {
    this.props.addressZipCode = addressZipCode;
  }

  public get addressZipCode(): string {
    return this.props.addressZipCode;
  }

  public set courseCode(courseCode: string) {
    this.props.courseCode = courseCode;
  }

  public get courseCode(): string {
    return this.props.courseCode;
  }

  public set courseDescription(courseDescription: string) {
    this.props.courseDescription = courseDescription;
  }

  public get courseDescription(): string {
    return this.props.courseDescription;
  }

  public set courseUnitPrice(courseUnitPrice: number) {
    this.props.courseUnitPrice = courseUnitPrice;
  }

  public get courseUnitPrice(): number {
    return this.props.courseUnitPrice;
  }

  public set customerEmail(customerEmail: string) {
    this.props.customerEmail = customerEmail;
  }

  public get customerEmail(): string {
    return this.props.customerEmail;
  }

  public set customerIdentity(customerIdentity: string) {
    this.props.customerIdentity = customerIdentity;
  }

  public get customerIdentity(): string {
    return this.props.customerIdentity;
  }

  public set customerName(customerName: string) {
    this.props.customerName = customerName;
  }

  public get customerName(): string {
    return this.props.customerName;
  }

  public set customerPhone(customerPhone: string) {
    this.props.customerPhone = customerPhone;
  }

  public get customerPhone(): string {
    return this.props.customerPhone;
  }
}
