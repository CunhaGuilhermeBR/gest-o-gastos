import { ObjectId } from 'mongodb';
import { ILogger } from '../../domain/logger/logger.interface';
import { ProductM } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repositories/product.interface.repository';
import { CategoryRepository } from 'src/domain/repositories/category.interface.repository';

export class AddProductUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository ) {}

  async execute(
    name: string,
    description: string,
    price: number,
    options: string[],
    active: boolean,
    category_id: ObjectId
  ): Promise<void> {
    const product = new ProductM();
    product.name = name;
    product.description = description;
    product.price = price;
    product.options = options;
    product.active = active !== undefined ? active : true;
    product.category_id = typeof category_id === "string" ? new ObjectId(category_id) : category_id;
    const category = await this.categoryRepository.findById(category_id)
    product.category_label = category.name

    await this.productRepository.insert(product);
    this.logger.log('AddProductUseCases execute', 'New product has been inserted');
  }
}
