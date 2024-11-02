import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UserController } from './user/user.controller';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ProductController } from './product/product.controller';
import { CategoryController } from './category/category.controller';

@Module({
  imports: [UsecasesProxyModule.register(), ExceptionsModule],
  controllers: [UserController, ProductController, CategoryController],
})
export class ControllersModule {}