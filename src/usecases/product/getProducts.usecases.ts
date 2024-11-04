import { ProductRepository } from '../../domain/repositories/product.interface.repository';

export class GetProductsUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(page?:number, limit?: number){
    return await this.productRepository.findAll(page, limit);
  }
}
