import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { ProductM } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repositories/product.interface.repository';
import { CategoryRepository } from 'src/domain/repositories/category.interface.repository';

export class UpdateProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository
  ) { }

  async execute(id: ObjectId, data: Partial<ProductM>): Promise<void> {
    if (data.category_id) {
      const category = await this.categoryRepository.findById(data.category_id)
      data.category_label = category.name
    }
    await this.productRepository.updateContent(id, data);
    this.logger.log('UpdateProductUseCases execute', `Product ${id} has been updated`);
  }
}
