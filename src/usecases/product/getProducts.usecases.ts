import { ProductRepository } from '../../domain/repositories/product.interface.repository';

export class GetProductsUseCases {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(page?:number, limit?: number){
    const products =  await this.productRepository.findAll(page, limit);
    const totalPage = await this.productRepository.findTotalPages(limit)
    return {totalPage, products}
  }
}
