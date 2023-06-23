import { Replace } from 'src/helpers/Replace';
import { BaseEntity } from '../base-entity';

export interface TicketProps {
  productId: string;
  createdAt: Date;
}

export class Ticket extends BaseEntity {
  private props: TicketProps;

  constructor(props: Replace<TicketProps, { createdAt?: Date }>, id?: string) {
    super(id);
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
    };
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public set productId(productId: string) {
    this.props.productId = productId;
  }

  public get productId(): string {
    return this.props.productId;
  }
}
