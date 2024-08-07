import { Body, Controller, Delete, Get, HttpCode, Inject, NotFoundException, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
import { UserPresenter } from './user.presenter';
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AddUserDto, UpdateUserDto } from './user.dto';
import { GetUserUseCases } from '../../../usecases/user/getUser.usecases';
import { GetUsersUseCases } from '../../../usecases/user/getUsers.usecases';
import { UpdateUserUseCases } from '../../../usecases/user/updateUser.usecases';
import { DeleteUserUseCases } from '../../../usecases/user/deleteUser.usecases';
import { AddUserUseCases } from '../../../usecases/user/addUser.usecases';
import { UserMWithoutPassword } from '../../../domain/model/user';
import { ObjectId } from 'typeorm';
import { LoginUseCases } from '../../../usecases/user/login.usecases';
import { ExceptionsService } from '../../exceptions/exceptions.service'

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    private readonly exceptionsService: ExceptionsService,
    @Inject(UsecasesProxyModule.GET_USER_USECASES_PROXY)
    private readonly getUserUsecaseProxy: UseCaseProxy<GetUserUseCases>,
    @Inject(UsecasesProxyModule.GET_USERS_USECASES_PROXY)
    private readonly getAllUserUsecaseProxy: UseCaseProxy<GetUsersUseCases>,
    @Inject(UsecasesProxyModule.PUT_USER_USECASES_PROXY)
    private readonly updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCases>,
    @Inject(UsecasesProxyModule.DELETE_USER_USECASES_PROXY)
    private readonly deleteUserUsecaseProxy: UseCaseProxy<DeleteUserUseCases>,
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCases>,
    @Inject(UsecasesProxyModule.POST_LOGIN_USECASES_PROXY)
    private readonly loginUsecaseProxy: UseCaseProxy<LoginUseCases>,
  ) { }

  @Get('user')
  @ApiResponseType(UserPresenter, false)
  async getUser(@Query('id') id: ObjectId) {
    const user = await this.getUserUsecaseProxy.getInstance().execute(id)
    if (!user) {
      this.exceptionsService.NotFoundException()
    }
    return new UserPresenter(user);
  }

  @Get('users')
  @ApiResponseType(UserPresenter, true)
  async getUsers() {
    const users = await this.getAllUserUsecaseProxy.getInstance().execute();
    return users.map((user) => new UserPresenter(user));
  }

  @Put('user')
  @ApiResponseType(UserPresenter, true)
  async updateUser(@Query('id') id: ObjectId, @Body() updateUserDto: UserMWithoutPassword) {
    await this.updateUserUsecaseProxy.getInstance().execute(id, updateUserDto);
    return;
  }

  @Delete('user')
  @ApiResponseType(UserPresenter, true)
  async deleteUser(@Query('id') id: ObjectId) {
    await this.deleteUserUsecaseProxy.getInstance().execute(id);
    return;
  }

  @Post('user')
  @ApiResponseType(UserPresenter, true)
  async addUser(@Body() addUserDto: AddUserDto) {
    const { username, password } = addUserDto;
    await this.addUserUsecaseProxy.getInstance().execute(username, password);
    return
  }

  @Post('login')
  @HttpCode(200)
  @ApiResponseType(UserPresenter, true)
  async login(@Body() addUserDto: AddUserDto) {
    const { username, password } = addUserDto;
    const user = await this.loginUsecaseProxy.getInstance().execute(username, password);
    if (!user) {
      this.exceptionsService.UnauthorizedException();
    }
    return new UserPresenter(user)
  }
}