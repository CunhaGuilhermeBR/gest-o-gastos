import { ObjectId } from 'typeorm';
import { CategoryM } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';

export class GetAllCategoriesUseCases {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(): Promise<CategoryM[]> {
    return await this.categoryRepository.findAll();
  }
}
