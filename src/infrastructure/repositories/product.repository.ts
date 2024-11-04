import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductM } from '../../domain/model/product';
import { ProductRepository } from '../../domain/repositories/product.interface.repository';
import { Product } from '../entities/product.entity'
import { ObjectId } from 'mongodb';

@Injectable()
export class DatabaseProductRepository implements ProductRepository {
    constructor(
        @InjectRepository(Product)
        private readonly productEntityRepository: Repository<Product>,
    ) { }

    async updateContent(id: ObjectId, data: Partial<ProductM>): Promise<void> {
        data.updated_date = new Date();
        delete data.create_date;
        if (data.category_id) {
            data.category_id = new ObjectId(data.category_id)
        }
        await this.productEntityRepository.update(
            { _id: new ObjectId(id) },
            data,
        );
    }

    async insert(product: ProductM): Promise<void> {
        await this.productEntityRepository.insert(this.toProductEntity(product));
    }

    async findAll(page: number = 1, limit: number = 10): Promise<ProductM[]> {
        const skip = (+page - 1) * +limit;

        const productsEntity = await this.productEntityRepository.find({
            skip: skip,
            take: +limit,
        });
        return productsEntity.map((productEntity) => this.product(productEntity));
    }

    async findById(id: ObjectId) {
        return await this.productEntityRepository.findOne({ where: { _id: new ObjectId(id) } });
    }

    async deleteById(id: ObjectId): Promise<void> {
        await this.productEntityRepository.delete({ _id: new ObjectId(id) });
    }

    private product(productEntity: Product): ProductM {
        const product: ProductM = new ProductM();

        product._id = productEntity._id;
        product.name = productEntity.name;
        product.description = productEntity.description;
        product.price = productEntity.price;
        product.options = productEntity.options;
        product.active = productEntity.active;
        product.category_id = productEntity.category_id;
        product.create_date = productEntity.create_date;
        product.updated_date = productEntity.updated_date;
        product.category_label = productEntity.category_label;

        return product;
    }

    private toProductEntity(product: ProductM): Product {
        const productEntity: Product = new Product();

        productEntity._id = new ObjectId();
        productEntity.name = product.name;
        productEntity.description = product.description;
        productEntity.price = product.price;
        productEntity.options = product.options;
        productEntity.active = product.active;
        productEntity.category_id = product.category_id;
        productEntity.create_date = new Date();
        productEntity.updated_date = new Date();
        productEntity.category_label = product.category_label;

        return productEntity;
    }
}
