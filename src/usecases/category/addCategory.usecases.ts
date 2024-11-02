import { ExceptionsService } from '../../infrastructure/exceptions/exceptions.service';
import { ILogger } from '../../domain/logger/logger.interface';
import { CategoryM } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';

export class AddCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository
  ) {}

  async execute(
    name: string,
    description?: string
  ): Promise<void> {
    const category = new CategoryM();
    category.name = name;
    category.description = description;

    await this.categoryRepository.insert(category);
    this.logger.log('AddCategoryUseCases execute', 'New category has been inserted');
  }
}
