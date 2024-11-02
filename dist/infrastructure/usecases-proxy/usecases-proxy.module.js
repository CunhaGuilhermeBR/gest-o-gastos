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
const addProduct_usecases_1 = require("../../usecases/product/addProduct.usecases");
const getProducts_usecases_1 = require("../../usecases/product/getProducts.usecases");
const updateProduct_usecases_1 = require("../../usecases/product/updateProduct.usecases");
const delete_usecases_1 = require("../../usecases/product/delete.usecases");
const product_repository_1 = require("../repositories/product.repository");
const addCategory_usecases_1 = require("../../usecases/category/addCategory.usecases");
const getCategories_usecases_1 = require("../../usecases/category/getCategories.usecases");
const updateCategory_usecases_1 = require("../../usecases/category/updateCategory.usecases");
const delete_usecases_2 = require("../../usecases/category/delete.usecases");
const category_repository_1 = require("../repositories/category.repository");
const getProduct_usecases_1 = require("../../usecases/product/getProduct.usecases");
const getCategory_usecases_1 = require("../../usecases/category/getCategory.usecases");
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
                {
                    inject: [product_repository_1.DatabaseProductRepository],
                    provide: UsecasesProxyModule_1.GET_PRODUCTS_USECASES_PROXY,
                    useFactory: (productRepository) => new usecases_proxy_1.UseCaseProxy(new getProducts_usecases_1.GetProductsUseCases(productRepository)),
                },
                {
                    inject: [product_repository_1.DatabaseProductRepository],
                    provide: UsecasesProxyModule_1.GET_PRODUCT_USECASES_PROXY,
                    useFactory: (productRepository) => new usecases_proxy_1.UseCaseProxy(new getProduct_usecases_1.GetProductUseCases(productRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, product_repository_1.DatabaseProductRepository],
                    provide: UsecasesProxyModule_1.POST_PRODUCT_USECASES_PROXY,
                    useFactory: (logger, productRepository) => new usecases_proxy_1.UseCaseProxy(new addProduct_usecases_1.AddProductUseCases(logger, productRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, product_repository_1.DatabaseProductRepository],
                    provide: UsecasesProxyModule_1.PUT_PRODUCT_USECASES_PROXY,
                    useFactory: (logger, productRepository) => new usecases_proxy_1.UseCaseProxy(new updateProduct_usecases_1.UpdateProductUseCases(logger, productRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, product_repository_1.DatabaseProductRepository],
                    provide: UsecasesProxyModule_1.DELETE_PRODUCT_USECASES_PROXY,
                    useFactory: (logger, productRepository) => new usecases_proxy_1.UseCaseProxy(new delete_usecases_1.DeleteProductUseCases(logger, productRepository)),
                },
                {
                    inject: [category_repository_1.DatabaseCategoryRepository],
                    provide: UsecasesProxyModule_1.GET_CATEGORY_USECASES_PROXY,
                    useFactory: (categoryRepository) => new usecases_proxy_1.UseCaseProxy(new getCategory_usecases_1.GetCategoryUseCases(categoryRepository)),
                },
                {
                    inject: [category_repository_1.DatabaseCategoryRepository],
                    provide: UsecasesProxyModule_1.GET_CATEGORIES_USECASES_PROXY,
                    useFactory: (categoryRepository) => new usecases_proxy_1.UseCaseProxy(new getCategories_usecases_1.GetCategoriesUseCases(categoryRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, category_repository_1.DatabaseCategoryRepository],
                    provide: UsecasesProxyModule_1.POST_CATEGORY_USECASES_PROXY,
                    useFactory: (logger, categoryRepository) => new usecases_proxy_1.UseCaseProxy(new addCategory_usecases_1.AddCategoryUseCases(logger, categoryRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, category_repository_1.DatabaseCategoryRepository],
                    provide: UsecasesProxyModule_1.PUT_CATEGORY_USECASES_PROXY,
                    useFactory: (logger, categoryRepository) => new usecases_proxy_1.UseCaseProxy(new updateCategory_usecases_1.UpdateCategoryUseCases(logger, categoryRepository)),
                },
                {
                    inject: [logger_service_1.LoggerService, category_repository_1.DatabaseCategoryRepository],
                    provide: UsecasesProxyModule_1.DELETE_CATEGORY_USECASES_PROXY,
                    useFactory: (logger, categoryRepository) => new usecases_proxy_1.UseCaseProxy(new delete_usecases_2.DeleteCategoryUseCases(logger, categoryRepository)),
                },
            ],
            exports: [
                UsecasesProxyModule_1.GET_USER_USECASES_PROXY,
                UsecasesProxyModule_1.GET_USERS_USECASES_PROXY,
                UsecasesProxyModule_1.POST_USER_USECASES_PROXY,
                UsecasesProxyModule_1.PUT_USER_USECASES_PROXY,
                UsecasesProxyModule_1.DELETE_USER_USECASES_PROXY,
                UsecasesProxyModule_1.POST_LOGIN_USECASES_PROXY,
                UsecasesProxyModule_1.GET_PRODUCT_USECASES_PROXY,
                UsecasesProxyModule_1.GET_PRODUCTS_USECASES_PROXY,
                UsecasesProxyModule_1.POST_PRODUCT_USECASES_PROXY,
                UsecasesProxyModule_1.PUT_PRODUCT_USECASES_PROXY,
                UsecasesProxyModule_1.DELETE_PRODUCT_USECASES_PROXY,
                UsecasesProxyModule_1.GET_CATEGORY_USECASES_PROXY,
                UsecasesProxyModule_1.GET_CATEGORIES_USECASES_PROXY,
                UsecasesProxyModule_1.POST_CATEGORY_USECASES_PROXY,
                UsecasesProxyModule_1.PUT_CATEGORY_USECASES_PROXY,
                UsecasesProxyModule_1.DELETE_CATEGORY_USECASES_PROXY,
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
UsecasesProxyModule.GET_CATEGORY_USECASES_PROXY = 'GetCategoryUsecasesProxy';
UsecasesProxyModule.GET_CATEGORIES_USECASES_PROXY = 'GetCategoriesUsecasesProxy';
UsecasesProxyModule.POST_CATEGORY_USECASES_PROXY = 'PostCategoryUsecasesProxy';
UsecasesProxyModule.PUT_CATEGORY_USECASES_PROXY = 'PutCategoryUsecasesProxy';
UsecasesProxyModule.DELETE_CATEGORY_USECASES_PROXY = 'DeleteCategoryUsecasesProxy';
UsecasesProxyModule.GET_PRODUCT_USECASES_PROXY = 'GetProductUsecasesProxy';
UsecasesProxyModule.GET_PRODUCTS_USECASES_PROXY = 'GetProductsUsecasesProxy';
UsecasesProxyModule.POST_PRODUCT_USECASES_PROXY = 'PostProductUsecasesProxy';
UsecasesProxyModule.PUT_PRODUCT_USECASES_PROXY = 'PutProductUsecasesProxy';
UsecasesProxyModule.DELETE_PRODUCT_USECASES_PROXY = 'DeleteProductUsecasesProxy';
exports.UsecasesProxyModule = UsecasesProxyModule = UsecasesProxyModule_1 = __decorate([
    (0, common_1.Module)({
        imports: [logger_module_1.LoggerModule, repositories_module_1.RepositoriesModule, exceptions_module_1.ExceptionsModule],
    })
], UsecasesProxyModule);
//# sourceMappingURL=usecases-proxy.module.js.map