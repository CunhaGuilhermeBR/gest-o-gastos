import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CategoryM } from '../../domain/model/category';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';
import { ObjectId } from 'mongodb';
import { Product } from '../entities/product.entity';

@Injectable()
export class DatabaseCategoryRepository implements CategoryRepository {
    constructor(
        @InjectRepository(Category)
        private readonly categoryEntityRepository: Repository<Category>,
        @InjectRepository(Product)
        private readonly productEntityRepository: Repository<Product>,
    ) { }

    async updateContent(id: ObjectId, data: Partial<CategoryM>): Promise<void> {
        data.updated_date = new Date();
        delete data.create_date;
        await this.categoryEntityRepository.update(
            { _id: new ObjectId(id) },
            data,
        );
    }

    async insert(category: CategoryM): Promise<void> {
        await this.categoryEntityRepository.insert(this.toCategoryEntity(category));
    }

    async findAll(): Promise<CategoryM[]> {
        const categoriesEntity = await this.categoryEntityRepository.find();
        return categoriesEntity.map((categoryEntity) => this.category(categoryEntity));
    }

    async findById(id: ObjectId): Promise<CategoryM> {
        return await this.categoryEntityRepository.findOne({ where: { _id: new ObjectId(id) } });
    }

    async deleteById(id: ObjectId): Promise<void> {
        await this.categoryEntityRepository.delete({ _id: new ObjectId(id) });
    }

    async findProductByCategory() {
        const categories = await this.categoryEntityRepository.find();
        const groupedProducts: Record<string, Product[]> = {};

        for (const category of categories) {
            const products = await this.productEntityRepository.find({
                where: {
                    category_id: new ObjectId(category._id),
                    active: true,
                },
            });

            if (products.length > 0) {
                groupedProducts[category.name] = products;
            }
        }

        return groupedProducts;
    }

    private category(categoryEntity: Category): CategoryM {
        const category: CategoryM = new CategoryM();

        category._id = categoryEntity._id;
        category.name = categoryEntity.name;
        category.description = categoryEntity.description;
        category.create_date = categoryEntity.create_date;
        category.updated_date = categoryEntity.updated_date;

        return category;
    }

    private toCategoryEntity(category: CategoryM): Category {
        const categoryEntity: Category = new Category();

        categoryEntity._id = new ObjectId();
        categoryEntity.name = category.name;
        categoryEntity.description = category.description;
        categoryEntity.create_date = new Date();
        categoryEntity.updated_date = new Date();

        return categoryEntity;
    }
}
