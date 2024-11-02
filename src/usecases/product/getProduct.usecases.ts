import { ObjectId } from 'typeorm';
import { ProductM } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repositories/product.interface.repository';

export class GetProductUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: ObjectId): Promise<ProductM> {
    return await this.productRepository.findById(id);
  }
}
