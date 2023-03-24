import { Replace } from 'src/helpers/Replace';
import { BaseEntity } from '../base-entity';

export interface AddressProps {
  city: string;
  complement: string;
  district: string;
  number: string;
  stateInitials: string;
  street: string;
  zipCode: string;
  updatedAt?: Date | null;
  createdAt: Date;
}

export class Address extends BaseEntity {
  private props: AddressProps;

  constructor(props: Replace<AddressProps, { createdAt?: Date }>, id?: string) {
    super(id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set city(city: string) {
    this.props.city = city;
  }

  public get city(): string {
    return this.props.city;
  }

  public set complement(complement: string) {
    this.props.complement = complement;
  }

  public get complement(): string {
    return this.props.complement;
  }

  public set district(district: string) {
    this.props.district = district;
  }

  public get district(): string {
    return this.props.district;
  }

  public set number(number: string) {
    this.props.number = number;
  }

  public get number(): string {
    return this.props.number;
  }

  public set stateInitials(stateInitials: string) {
    this.props.stateInitials = stateInitials;
  }

  public get stateInitials(): string {
    return this.props.stateInitials;
  }

  public set street(street: string) {
    this.props.street = street;
  }

  public get street(): string {
    return this.props.street;
  }

  public set zipCode(zipCode: string) {
    this.props.zipCode = zipCode;
  }

  public get zipCode(): string {
    return this.props.zipCode;
  }
}
