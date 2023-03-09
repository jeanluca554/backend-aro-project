import { v4 as randomUUID } from 'uuid';

export class BaseEntity {
  private _id: string;

  constructor(id?: string) {
    this._id = id ?? randomUUID();
  }

  public get id(): string {
    return this._id;
  }
}
