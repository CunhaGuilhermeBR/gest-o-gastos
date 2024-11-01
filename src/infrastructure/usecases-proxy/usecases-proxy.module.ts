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

  

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
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
          useFactory: (userRepository: DatabaseUserRepository) => new UseCaseProxy(new GetUserUseCases(userRepository)),
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
        
      ],
      exports: [
        UsecasesProxyModule.GET_USER_USECASES_PROXY,
        UsecasesProxyModule.GET_USERS_USECASES_PROXY,
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        UsecasesProxyModule.PUT_USER_USECASES_PROXY,
        UsecasesProxyModule.DELETE_USER_USECASES_PROXY,
        UsecasesProxyModule.POST_LOGIN_USECASES_PROXY,
      ],
    };
  }
}
