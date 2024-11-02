import { ObjectId } from 'typeorm';
import { CategoryM } from '../model/category';

export interface CategoryRepository {
  insert(data: CategoryM): Promise<void>;
  findAll(): Promise<CategoryM[]>;
  findById(id: ObjectId): Promise<CategoryM>;
  updateContent(id: ObjectId, data: Partial<CategoryM>): Promise<void>;
  deleteById(id: ObjectId): Promise<void>;
  findProductByCategory();
}