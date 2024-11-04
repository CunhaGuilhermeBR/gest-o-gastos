import { Body, Controller, Delete, Get, HttpCode, Inject, NotFoundException, Patch, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { ProductPresenter } from './product.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AddProductDto, UpdateProductDto } from './product.dto';
import { GetProductUseCases } from '../../../usecases/product/getProduct.usecases';
import { GetProductsUseCases } from '../../../usecases/product/getProducts.usecases';
import { UpdateProductUseCases } from '../../../usecases/product/updateProduct.usecases';
import { DeleteProductUseCases } from '../../../usecases/product/delete.usecases';
import { AddProductUseCases } from '../../../usecases/product/addProduct.usecases';
import { ProductM } from '../../../domain/model/product';
import { ObjectId } from 'typeorm';
import { ExceptionsService } from '../../exceptions/exceptions.service';

@Controller('product')
@ApiTags('product')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(ProductPresenter)
export class ProductController {
  constructor(
    private readonly exceptionsService: ExceptionsService,
    @Inject(UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY)
    private readonly getProductUsecaseProxy: UseCaseProxy<GetProductUseCases>,
    @Inject(UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY)
    private readonly getAllProductUsecaseProxy: UseCaseProxy<GetProductsUseCases>,
    @Inject(UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY)
    private readonly updateProductUsecaseProxy: UseCaseProxy<UpdateProductUseCases>,
    @Inject(UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY)
    private readonly deleteProductUsecaseProxy: UseCaseProxy<DeleteProductUseCases>,
    @Inject(UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY)
    private readonly addProductUsecaseProxy: UseCaseProxy<AddProductUseCases>,
  ) { }

  @Get('product')
  @ApiResponseType(ProductPresenter, false)
  async getProduct(@Query('id') id: ObjectId) {
    const product = await this.getProductUsecaseProxy.getInstance().execute(id);
    if (!product) {
      this.exceptionsService.NotFoundException();
    }
    return new ProductPresenter(product);
  }

  @Get('products')
  @ApiResponseType(ProductPresenter, true)
  async getProducts(@Query('page') page: number, @Query('limit') limit: number) {
    const products = await this.getAllProductUsecaseProxy.getInstance().execute(page, limit);
    return products.map((product) => new ProductPresenter(product));
  }

  @Patch('product')
  @ApiResponseType(ProductPresenter, true)
  async updateProduct(@Query('id') id: ObjectId, @Body() updateProductDto: UpdateProductDto) {
    await this.updateProductUsecaseProxy.getInstance().execute(id, updateProductDto);
    return;
  }

  @Delete('product')
  @ApiResponseType(ProductPresenter, true)
  async deleteProduct(@Query('id') id: ObjectId) {
    await this.deleteProductUsecaseProxy.getInstance().execute(id);
    return;
  }

  @Post('product')
  @ApiResponseType(ProductPresenter, true)
  async addProduct(@Body() addProductDto: AddProductDto) {
    const { name, description, price, options, active, category_id } = addProductDto;
    await this.addProductUsecaseProxy.getInstance().execute(name, description, price, options, active, category_id);
    return;
  }
}
