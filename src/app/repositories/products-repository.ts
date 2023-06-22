import { Product } from '../entities/product/product';

export abstract class ProductsRepository {
  abstract create(product: Product): Promise<void>;
  //abstract findById(notificationId: string): Promise<Notification | null>;
  //abstract save(notification: Notification): Promise<void>;
  //abstract countManyByRecipientId(recipientId: string): Promise<number>;
  abstract findMany(): Promise<Product[]>;
}
