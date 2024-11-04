import { ObjectId } from 'typeorm';
import { CategoryM } from '../model/category';
import { ProductM } from '../model/product';

export interface CategoryRepository {
  insert(data: CategoryM): Promise<void>;
  findAll(): Promise<CategoryM[]>;
  findById(id: ObjectId): Promise<CategoryM>;
  updateContent(id: ObjectId, data: Partial<CategoryM>): Promise<void>;
  deleteById(id: ObjectId): Promise<void>;
  findProductByCategory(
    filters?: { name?: string; price?: number; description?: string }, 
    sortField?: string,                                                
    sortOrder?: 'asc' | 'desc'                                         
  ): Promise<Record<string, ProductM[]>>;

}