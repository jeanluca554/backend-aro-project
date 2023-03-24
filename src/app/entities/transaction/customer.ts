import { Replace } from 'src/helpers/Replace';
import { Address } from './address';
// import { BaseEntity } from '../base-entity';

export interface CustomerProps {
  address: Address;
  email: string;
  name: string;
  phone: string;
  createdAt: Date;
}

export class Customer {
  private _identity: string;
  private props: CustomerProps;

  constructor(
    props: Replace<CustomerProps, { createdAt?: Date }>,
    identity: string,
  ) {
    this._identity = identity;
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._identity;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set address(address: Address) {
    this.props.address = address;
  }

  public get address(): Address {
    return this.props.address;
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }

  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }

  public set phone(phone: string) {
    this.props.phone = phone;
  }

  public get phone(): string {
    return this.props.phone;
  }
}
