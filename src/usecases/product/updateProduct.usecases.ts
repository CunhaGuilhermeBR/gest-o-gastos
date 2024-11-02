import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { ProductM } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repositories/product.interface.repository';

export class UpdateProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: ObjectId, data: Partial<ProductM>): Promise<void> {
    await this.productRepository.updateContent(id, data);
    this.logger.log('UpdateProductUseCases execute', `Product ${id} has been updated`);
  }
}
