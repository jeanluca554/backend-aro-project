import { Replace } from 'src/helpers/Replace';
import { BaseEntity } from '../base-entity';

export interface TicketProps {
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
}
