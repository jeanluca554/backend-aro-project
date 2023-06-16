import { Replace } from 'src/helpers/Replace';
import { BaseEntity } from '../base-entity';
import { Customer } from './customer';
import { Product } from './product';

export interface TransactionProps {
  customer: Customer;
  products: Product[];
  paymentMethod: string;
  installments: number;
  message: string | null;
  status: number | null;
  discount?: number | null;
  transactionToken?: string;
  hasError: boolean;
  errorCode?: string;
  errorMessage?: string;
  description: string | null;
  tid?: string;
  pixQrCode?: string;
  pixKey?: string;
  idTransactionSafe2Pay: string | null;
  authorizationCode?: string;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Transaction extends BaseEntity {
  private props: TransactionProps;

  constructor(props: Replace<TransactionProps, { createdAt?: Date }>, id?: string) {
    super(id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
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

  public set message(message: string | null) {
    this.props.message = message;
  }

  public get message(): string | null {
    return this.props.message;
  }

  public set transactionToken(transactionToken: string | undefined) {
    this.props.transactionToken = transactionToken;
  }

  public get transactionToken(): string | undefined {
    return this.props.transactionToken;
  }

  public set installments(installments: number) {
    this.props.installments = installments;
  }

  public get installments(): number {
    return this.props.installments;
  }

  public set status(status: number | null) {
    this.props.status = status;
  }

  public get status(): number | null {
    return this.props.status;
  }

  public set discount(discount: number | null | undefined) {
    this.props.discount = discount;
  }

  public get discount(): number | null | undefined {
    return this.props.discount;
  }

  public set errorCode(errorCode: string | undefined) {
    this.props.errorCode = errorCode;
  }

  public get errorCode(): string | undefined {
    return this.props.errorCode;
  }

  public set errorMessage(errorMessage: string | undefined) {
    this.props.errorMessage = errorMessage;
  }

  public get errorMessage(): string | undefined {
    return this.props.errorMessage;
  }

  public set description(description: string | null) {
    this.props.description = description;
  }

  public get description(): string | null {
    return this.props.description;
  }

  public set tid(tid: string | undefined) {
    this.props.tid = tid;
  }

  public get tid(): string | undefined {
    return this.props.tid;
  }

  public set pixQrCode(pixQrCode: string | undefined) {
    this.props.pixQrCode = pixQrCode;
  }

  public get pixQrCode(): string | undefined {
    return this.props.pixQrCode;
  }

  public set pixKey(pixKey: string | undefined) {
    this.props.pixKey = pixKey;
  }

  public get pixKey(): string | undefined {
    return this.props.pixKey;
  }

  public set idTransactionSafe2Pay(idTransactionSafe2Pay: string | null) {
    this.props.idTransactionSafe2Pay = idTransactionSafe2Pay;
  }

  public get idTransactionSafe2Pay(): string | null {
    return this.props.idTransactionSafe2Pay;
  }

  public set authorizationCode(authorizationCode: string | undefined) {
    this.props.authorizationCode = authorizationCode;
  }

  public get authorizationCode(): string | undefined {
    return this.props.authorizationCode;
  }

  public set hasError(hasError: boolean) {
    this.props.hasError = hasError;
  }

  public get hasError(): boolean {
    return this.props.hasError;
  }

  public set customer(customer: Customer) {
    this.props.customer = customer;
  }

  public get customer(): Customer {
    return this.props.customer;
  }

  public get products(): Product[] {
    return this.props.products;
  }

  public set products(product: Product[]) {
    this.props.products = product;
  }

  public setStatusAuthorized() {
    this.status = 3;
  }
}
