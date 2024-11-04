import { ObjectId } from 'typeorm';
import { CategoryM } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';

export class GetCategoriesUseCases {
  constructor(private readonly categoryRepository: CategoryRepository) { }

  async execute(filters: { name?: string, price?: number, description?: string }, sortField?: string, sortOrder: 'asc' | 'desc' = 'asc') {
    return await this.categoryRepository.findProductByCategory(filters, sortField, sortOrder);
  }

}
