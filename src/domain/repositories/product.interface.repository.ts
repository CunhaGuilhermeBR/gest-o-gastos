import { ObjectId } from 'typeorm';
import { ProductM } from '../model/product';

export interface ProductRepository {
  insert(Product: ProductM): Promise<void>;
  findAll(page: number, limit: number): Promise<ProductM[]>;
  findById(id: ObjectId);
  updateContent(id: ObjectId, data: Partial<ProductM>): Promise<void>;
  deleteById(id: ObjectId): Promise<void>;
}