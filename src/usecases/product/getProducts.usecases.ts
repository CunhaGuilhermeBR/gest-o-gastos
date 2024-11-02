import { ObjectId } from 'typeorm';
import { ProductM } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repositories/product.interface.repository';

export class GetProductsUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(){
    return await this.productRepository.findAll();
  }
}
