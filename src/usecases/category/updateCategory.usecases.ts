import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { CategoryM } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';

export class UpdateCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(id: ObjectId, data: Partial<CategoryM>): Promise<void> {
    await this.categoryRepository.updateContent(id, data);
    this.logger.log('UpdateCategoryUseCases execute', `Category ${id} has been updated`);
  }
}
