import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { ProductRepository } from '../../domain/repositories/product.interface.repository';

export class DeleteProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository
  ) {}

  async execute(id: ObjectId): Promise<void> {
    await this.productRepository.deleteById(id);
    this.logger.log('DeleteProductUseCases execute', `Product ${id} has been deleted`);
  }
}
