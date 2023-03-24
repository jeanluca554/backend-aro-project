import { Replace } from 'src/helpers/Replace';
import { BaseEntity } from '../base-entity';

export interface ProductProps {
  description?: string;
  price: number;
  // createdAt: Date;
}

export class Product extends BaseEntity {
  private props: ProductProps;

  constructor(props: Replace<ProductProps, { createdAt?: Date }>, id?: string) {
    super(id);
    this.props = {
      ...props,
      // createdAt: props.createdAt ?? new Date(),
    };
  }

  // public get createdAt(): Date {
  //   return this.props.createdAt;
  // }

  public set description(description: string | undefined) {
    this.props.description = description;
  }

  public get description(): string | undefined {
    return this.props.description;
  }

  public set price(price: number) {
    this.props.price = price;
  }

  public get price(): number {
    return this.props.price;
  }
}
