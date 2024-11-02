import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseModule } from '../config/mongodb/mongodb.module';
import { Product } from '../entities/product.entity';
import { Category } from '../entities/category.entity';
import { DatabaseProductRepository } from './product.repository';
import { DatabaseCategoryRepository } from './category.repository';

@Module({
  imports: [TypeOrmConfigModule, DatabaseModule ,TypeOrmModule.forFeature([User, Category, Product])],
  providers: [DatabaseUserRepository, DatabaseProductRepository, DatabaseCategoryRepository],
  exports: [DatabaseUserRepository, DatabaseProductRepository, DatabaseCategoryRepository],
})
export class RepositoriesModule {}