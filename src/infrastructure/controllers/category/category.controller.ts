import { Body, Controller, Delete, Get, HttpCode, Inject, NotFoundException, Patch, Post, Put, Query, UnauthorizedException } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { CategoryPresenter } from './category.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AddCategoryDto, UpdateCategoryDto } from './category.dto'
import { GetCategoryUseCases } from '../../../usecases/category/getCategory.usecases';
import { GetCategoriesUseCases } from '../../../usecases/category/getCategories.usecases';
import { UpdateCategoryUseCases } from '../../../usecases/category/updateCategory.usecases';
import { DeleteCategoryUseCases } from '../../../usecases/category/delete.usecases';
import { AddCategoryUseCases } from '../../../usecases/category/addCategory.usecases';
import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'typeorm';
import { ExceptionsService } from '../../exceptions/exceptions.service';
import { GetAllCategoriesUseCases } from 'src/usecases/category/getAll.usecases';
import { UserMWithoutPassword } from '../../../domain/model/user';

@Controller('category')
@ApiTags('category')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CategoryPresenter)
export class CategoryController {
  constructor(
    private readonly exceptionsService: ExceptionsService,
    @Inject(UsecasesProxyModule.GET_CATEGORY_USECASES_PROXY)
    private readonly getCategoryUsecaseProxy: UseCaseProxy<GetCategoryUseCases>,
    @Inject(UsecasesProxyModule.GET_CATEGORIES_USECASES_PROXY)
    private readonly getAllCategoryUsecaseProxy: UseCaseProxy<GetCategoriesUseCases>,
    @Inject(UsecasesProxyModule.PUT_CATEGORY_USECASES_PROXY)
    private readonly updateCategoryUsecaseProxy: UseCaseProxy<UpdateCategoryUseCases>,
    @Inject(UsecasesProxyModule.DELETE_CATEGORY_USECASES_PROXY)
    private readonly deleteCategoryUsecaseProxy: UseCaseProxy<DeleteCategoryUseCases>,
    @Inject(UsecasesProxyModule.POST_CATEGORY_USECASES_PROXY)
    private readonly addCategoryUsecaseProxy: UseCaseProxy<AddCategoryUseCases>,
    @Inject(UsecasesProxyModule.GET_ALL_CATEGORY_USECASES_PROXY)
    private readonly getAllCategoriesUsecaseProxy: UseCaseProxy<GetAllCategoriesUseCases>,
  ) { }

  @Get('category')
  @ApiResponseType(CategoryPresenter, false)
  async getCategory(@Query('id') id: ObjectId) {
    const category = await this.getCategoryUsecaseProxy.getInstance().execute(id);
    if (!category) {
      this.exceptionsService.NotFoundException();
    }
    return new CategoryPresenter(category);
  }

  @Get('categories')
  @ApiResponseType(CategoryPresenter, true)
  async getCategories(
    @Query('name') name?: string,          
    @Query('price') price?: number,       
    @Query('description') description?: string, 
    @Query('sortField') sortField?: string, 
    @Query('sortOrder') sortOrder: 'asc' | 'desc' = 'asc'
  ) {
    const categories = await this.getAllCategoryUsecaseProxy.getInstance().execute(
      { name, price, description }, sortField, sortOrder
    );
    return categories;
  }


  @Get('all')
  @ApiResponseType(CategoryPresenter, true)
  async getAllCategories() {
    return await this.getAllCategoriesUsecaseProxy.getInstance().execute();
  }

  @Patch('category')
  @ApiResponseType(CategoryPresenter, true)
  async updateCategory(@Query('id') id: ObjectId, @Body() updateCategoryDto: UpdateCategoryDto) {
    await this.updateCategoryUsecaseProxy.getInstance().execute(id, updateCategoryDto);
    return;
  }

  @Delete('category')
  @ApiResponseType(CategoryPresenter, true)
  async deleteCategory(@Query('id') id: ObjectId, @Query('token') token: any) {
    if(!token){
      throw new UnauthorizedException('Token de auth é necessário')
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY) as UserMWithoutPassword
    await this.deleteCategoryUsecaseProxy.getInstance().execute(id, decoded);
    return;
  }

  @Post('category')
  @ApiResponseType(CategoryPresenter, true)
  async addCategory(@Body() addCategoryDto: AddCategoryDto) {
    const { name, description } = addCategoryDto;
    await this.addCategoryUsecaseProxy.getInstance().execute(name, description);
    return;
  }
}
