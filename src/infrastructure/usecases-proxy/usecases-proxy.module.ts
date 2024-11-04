import { DynamicModule, Module } from '@nestjs/common';
import { GetUsersUseCases } from '../../usecases/user/getUsers.usecases';
import { AddUserUseCases } from '../../usecases/user/addUser.usecases';
import { GetUserUseCases } from '../../usecases/user/getUser.usecases';
import { UpdateUserUseCases } from '../../usecases/user/updateUser.usecases';
import { DeleteUserUseCases } from '../../usecases/user/deleteUser.usecases';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';
import { RepositoriesModule } from '../repositories/repositories.module';
import { DatabaseUserRepository } from '../repositories/user.repository';
import { UseCaseProxy } from './usecases-proxy';
import { LoginUseCases } from '../../usecases/user/login.usecases';
import { ExceptionsService } from '../exceptions/exceptions.service';

// Import Product and Category Use Cases
import { AddProductUseCases } from '../../usecases/product/addProduct.usecases';
import { GetProductsUseCases } from '../../usecases/product/getProducts.usecases';
import { UpdateProductUseCases } from '../../usecases/product/updateProduct.usecases';
import { DeleteProductUseCases } from '../../usecases/product/delete.usecases';
import { DatabaseProductRepository } from '../repositories/product.repository';
import { AddCategoryUseCases } from '../../usecases/category/addCategory.usecases';
import { GetCategoriesUseCases } from '../../usecases/category/getCategories.usecases';
import { UpdateCategoryUseCases } from '../../usecases/category/updateCategory.usecases';
import { DeleteCategoryUseCases } from '../../usecases/category/delete.usecases';
import { DatabaseCategoryRepository } from '../repositories/category.repository';
import { GetProductUseCases } from 'src/usecases/product/getProduct.usecases';
import { GetCategoryUseCases } from 'src/usecases/category/getCategory.usecases';
import { GetAllCategoriesUseCases } from 'src/usecases/category/getAll.usecases';

@Module({
  imports: [LoggerModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  static DELETE_USER_USECASES_PROXY = 'DeleteUserUsecasesProxy';
  static GET_USER_USECASES_PROXY = 'GetUserUsecasesProxy';
  static GET_USERS_USECASES_PROXY = 'GetUsersUsecasesProxy';
  static POST_USER_USECASES_PROXY = 'PostUserUsecasesProxy';
  static PUT_USER_USECASES_PROXY = 'PutUserUsecasesProxy';
  static POST_LOGIN_USECASES_PROXY = 'LoginUserUsecasesProxy';

  // Category Usecase Proxies
  static GET_CATEGORY_USECASES_PROXY = 'GetCategoryUsecasesProxy';
  static GET_ALL_CATEGORY_USECASES_PROXY = 'GetAllCategoriesusecasesProxy'
  static GET_CATEGORIES_USECASES_PROXY = 'GetCategoriesUsecasesProxy';
  static POST_CATEGORY_USECASES_PROXY = 'PostCategoryUsecasesProxy';
  static PUT_CATEGORY_USECASES_PROXY = 'PutCategoryUsecasesProxy';
  static DELETE_CATEGORY_USECASES_PROXY = 'DeleteCategoryUsecasesProxy';

  // Product Usecase Proxies
  static GET_PRODUCT_USECASES_PROXY = 'GetProductUsecasesProxy';
  static GET_PRODUCTS_USECASES_PROXY = 'GetProductsUsecasesProxy';
  static POST_PRODUCT_USECASES_PROXY = 'PostProductUsecasesProxy';
  static PUT_PRODUCT_USECASES_PROXY = 'PutProductUsecasesProxy';
  static DELETE_PRODUCT_USECASES_PROXY = 'DeleteProductUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        // User Use Cases
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USERS_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new GetUsersUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.POST_LOGIN_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new LoginUseCases(userRepository)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.GET_USER_USECASES_PROXY,
          useFactory: (userRepository: DatabaseUserRepository) => 
            new UseCaseProxy(new GetUserUseCases(userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository, ExceptionsService],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository, exceptionsService: ExceptionsService) =>
            new UseCaseProxy(new AddUserUseCases(logger, userRepository, exceptionsService)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.PUT_USER_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new UpdateUserUseCases(logger, userRepository)),
        },
        {
          inject: [LoggerService, DatabaseUserRepository],
          provide: UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository) =>
            new UseCaseProxy(new DeleteUserUseCases(logger, userRepository)),
        },

        // Product Use Cases
        {
          inject: [DatabaseProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
          useFactory: (productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new GetProductsUseCases(productRepository)),
        },
        {
          inject: [DatabaseProductRepository],
          provide: UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
          useFactory: (productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new GetProductUseCases(productRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
          useFactory: (logger: LoggerService, productRepository: DatabaseProductRepository, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new AddProductUseCases(logger, productRepository, categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
          useFactory: (logger: LoggerService, productRepository: DatabaseProductRepository, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new UpdateProductUseCases(logger, productRepository, categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseProductRepository],
          provide: UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
          useFactory: (logger: LoggerService, productRepository: DatabaseProductRepository) =>
            new UseCaseProxy(new DeleteProductUseCases(logger, productRepository)),
        },

        // Category Use Cases
        {
          inject: [DatabaseCategoryRepository],
          provide: UsecasesProxyModule.GET_CATEGORY_USECASES_PROXY,
          useFactory: (categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new GetCategoryUseCases(categoryRepository)),
        },
        {
          inject: [DatabaseCategoryRepository],
          provide: UsecasesProxyModule.GET_ALL_CATEGORY_USECASES_PROXY,
          useFactory: (categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new GetAllCategoriesUseCases(categoryRepository)),
        },
        {
          inject: [DatabaseCategoryRepository],
          provide: UsecasesProxyModule.GET_CATEGORIES_USECASES_PROXY,
          useFactory: (categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new GetCategoriesUseCases(categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.POST_CATEGORY_USECASES_PROXY,
          useFactory: (logger: LoggerService, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new AddCategoryUseCases(logger, categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.PUT_CATEGORY_USECASES_PROXY,
          useFactory: (logger: LoggerService, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new UpdateCategoryUseCases(logger, categoryRepository)),
        },
        {
          inject: [LoggerService, DatabaseCategoryRepository],
          provide: UsecasesProxyModule.DELETE_CATEGORY_USECASES_PROXY,
          useFactory: (logger: LoggerService, categoryRepository: DatabaseCategoryRepository) =>
            new UseCaseProxy(new DeleteCategoryUseCases(logger, categoryRepository)),
        },
      ],
      exports: [
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        UsecasesProxyModule.PUT_USER_USECASES_PROXY,
        UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_LOGIN_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY,
        UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY,
        UsecasesProxyModule.GET_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.GET_CATEGORIES_USECASES_PROXY,
        UsecasesProxyModule.POST_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.PUT_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.DELETE_CATEGORY_USECASES_PROXY,
        UsecasesProxyModule.GET_ALL_CATEGORY_USECASES_PROXY
      ],
    };
  }
}
