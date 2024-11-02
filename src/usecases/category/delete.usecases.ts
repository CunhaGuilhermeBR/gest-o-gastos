import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';

export class DeleteCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(id: ObjectId): Promise<void> {
    await this.categoryRepository.deleteById(id);
    this.logger.log('DeleteCategoryUseCases execute', `Category ${id} has been deleted`);
  }
}
