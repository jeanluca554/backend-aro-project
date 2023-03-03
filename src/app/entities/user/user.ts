import { BaseEntity } from '../base-entity';

export interface UserProps {
  email: string;
  password: string;
  name: string;
}

export class User extends BaseEntity {
  private props: UserProps;

  constructor(props: UserProps, id?: string) {
    super(id);
    this.props = {
      ...props,
    };
  }

  public set email(email: string) {
    this.props.email = email;
  }

  public get email(): string {
    return this.props.email;
  }
  public set password(password: string) {
    this.props.password = password;
  }

  public get password(): string {
    return this.props.password;
  }
  public set name(name: string) {
    this.props.name = name;
  }

  public get name(): string {
    return this.props.name;
  }
}
