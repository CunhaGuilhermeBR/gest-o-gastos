"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var UsecasesProxyModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsecasesProxyModule = void 0;
const common_1 = require("@nestjs/common");
const getUsers_usecases_1 = require("../../usecases/user/getUsers.usecases");
const addUser_usecases_1 = require("../../usecases/user/addUser.usecases");
const getUser_usecases_1 = require("../../usecases/user/getUser.usecases");
const updateUser_usecases_1 = require("../../usecases/user/updateUser.usecases");
const deleteUser_usecases_1 = require("../../usecases/user/deleteUser.usecases");
const exceptions_module_1 = require("../exceptions/exceptions.module");
const logger_module_1 = require("../logger/logger.module");
const logger_service_1 = require("../logger/logger.service");
const repositories_module_1 = require("../repositories/repositories.module");
const user_repository_1 = require("../repositories/user.repository");
const usecases_proxy_1 = require("./usecases-proxy");
const login_usecases_1 = require("../../usecases/user/login.usecases");
const exceptions_service_1 = require("../exceptions/exceptions.service");
let UsecasesProxyModule = UsecasesProxyModule_1 = class UsecasesProxyModule {
    static register() {
        return {
            module: UsecasesProxyModule_1,
            providers: [
                {
                    inject: [user_repository_1.DatabaseUserRepository],
                    provide: UsecasesProxyModule_1.GET_USERS_USECASES_PROXY,
                    useFactory: (userRepository) => new usecases_proxy_1.UseCaseProxy(new getUsers_usecases_1.GetUsersUseCases(userRepository)),
                },
                {
                    inject: [user_repository_1.DatabaseUserRepository],
                    provide: UsecasesProxyModule_1.POST_LOGIN_USECASES_PROXY,
                    useFactory: (userRepository) => new usecases_proxy_1.UseCaseProxy(new login_usecases_1.LoginUseCases(userRepository)),
                },
                {
                    inject: [user_repository_1.DatabaseUserRepository],
                    provide: UsecasesProxyModule_1.GET_USER_USECASES_PROXY,
                    useFactory: (userRepository) => new usecases_proxy_1.UseCaseProxy(new getUser_usecases_1.GetUserUseCases(userRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, user_repository_1.DatabaseUserRepository, exceptions_service_1.ExceptionsService],
                    provide: UsecasesProxyModule_1.POST_USER_USECASES_PROXY,
                    useFactory: (logger, userRepository, exceptionsService) => new usecases_proxy_1.UseCaseProxy(new addUser_usecases_1.AddUserUseCases(logger, userRepository, exceptionsService)),
                },
                {
                    inject: [logger_service_1.LoggerService, user_repository_1.DatabaseUserRepository],
                    provide: UsecasesProxyModule_1.PUT_USER_USECASES_PROXY,
                    useFactory: (logger, userRepository) => new usecases_proxy_1.UseCaseProxy(new updateUser_usecases_1.UpdateUserUseCases(logger, userRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, user_repository_1.DatabaseUserRepository],
                    provide: UsecasesProxyModule_1.DELETE_USER_USECASES_PROXY,
                    useFactory: (logger, userRepository) => new usecases_proxy_1.UseCaseProxy(new deleteUser_usecases_1.DeleteUserUseCases(logger, userRepository)),
                },
            ],
            exports: [
                UsecasesProxyModule_1.GET_USER_USECASES_PROXY,
                UsecasesProxyModule_1.GET_USERS_USECASES_PROXY,
                UsecasesProxyModule_1.POST_USER_USECASES_PROXY,
                UsecasesProxyModule_1.PUT_USER_USECASES_PROXY,
                UsecasesProxyModule_1.DELETE_USER_USECASES_PROXY,
                UsecasesProxyModule_1.POST_LOGIN_USECASES_PROXY,
            ],
        };
    }
};
exports.UsecasesProxyModule = UsecasesProxyModule;
UsecasesProxyModule.DELETE_USER_USECASES_PROXY = 'DeleteUserUsecasesProxy';
UsecasesProxyModule.GET_USER_USECASES_PROXY = 'GetUserUsecasesProxy';
UsecasesProxyModule.GET_USERS_USECASES_PROXY = 'GetUsersUsecasesProxy';
UsecasesProxyModule.POST_USER_USECASES_PROXY = 'PostUserUsecasesProxy';
UsecasesProxyModule.PUT_USER_USECASES_PROXY = 'PutUserUsecasesProxy';
UsecasesProxyModule.POST_LOGIN_USECASES_PROXY = 'LoginUserUsecasesProxy';
exports.UsecasesProxyModule = UsecasesProxyModule = UsecasesProxyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule, repositories_module_1.RepositoriesModule, exceptions_module_1.ExceptionsModule],
    })
], UsecasesProxyModule);
//# sourceMappingURL=usecases-proxy.module.js.map