import { ObjectId } from 'typeorm';
import { CategoryM } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';

export class GetCategoryUseCases {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  async execute(id: ObjectId): Promise<CategoryM> {
    return await this.categoryRepository.findById(id);
  }
}
