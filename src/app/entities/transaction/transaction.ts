import { Replace } from 'src/helpers/Replace';
import { BaseEntity } from '../base-entity';
import { Customer } from './customer';
import { Product } from './product';

export interface TransactionProps {
  customer: Customer;
  product: Product;
  paymentMethod: string;
  installments: number;
  message?: string;
  status?: number;
  discount?: number | null;
  cardToken?: string;
  canceledAt?: Date | null;
  createdAt: Date;
}

export class Transaction extends BaseEntity {
  private props: TransactionProps;

  constructor(
    props: Replace<TransactionProps, { createdAt?: Date }>,
    id?: string,
  ) {
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

  public set message(message: string | undefined) {
    this.props.message = message;
  }

  public get message(): string | undefined {
    return this.props.message;
  }

  public set cardToken(cardToken: string | undefined) {
    this.props.cardToken = cardToken;
  }

  public get cardToken(): string | undefined {
    return this.props.cardToken;
  }

  public set installments(installments: number) {
    this.props.installments = installments;
  }

  public get installments(): number {
    return this.props.installments;
  }

  public set status(status: number | undefined) {
    this.props.status = status;
  }

  public get status(): number | undefined {
    return this.props.status;
  }

  public set discount(discount: number | null | undefined) {
    this.props.discount = discount;
  }

  public get discount(): number | null | undefined {
    return this.props.discount;
  }

  public set customer(customer: Customer) {
    this.props.customer = customer;
  }

  public get customer(): Customer {
    return this.props.customer;
  }

  public set product(product: Product) {
    this.props.product = product;
  }

  public get product(): Product {
    return this.props.product;
  }
}
