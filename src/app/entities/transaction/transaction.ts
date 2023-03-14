import { Replace } from 'src/helpers/Replace';
import { v4 as randomUUID } from 'uuid';

export interface TransactionProps {
  paymentMethod: string;
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
}
