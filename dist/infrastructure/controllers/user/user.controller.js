"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const usecases_proxy_1 = require("../../usecases-proxy/usecases-proxy");
const usecases_proxy_module_1 = require("../../usecases-proxy/usecases-proxy.module");
const user_presenter_1 = require("./user.presenter");
const response_decorator_1 = require("../../common/swagger/response.decorator");
const user_dto_1 = require("./user.dto");
const user_1 = require("../../../domain/model/user");
const typeorm_1 = require("typeorm");
const exceptions_service_1 = require("../../exceptions/exceptions.service");
let UserController = class UserController {
    constructor(exceptionsService, getUserUsecaseProxy, getAllUserUsecaseProxy, updateUserUsecaseProxy, deleteUserUsecaseProxy, addUserUsecaseProxy, loginUsecaseProxy) {
        this.exceptionsService = exceptionsService;
        this.getUserUsecaseProxy = getUserUsecaseProxy;
        this.getAllUserUsecaseProxy = getAllUserUsecaseProxy;
        this.updateUserUsecaseProxy = updateUserUsecaseProxy;
        this.deleteUserUsecaseProxy = deleteUserUsecaseProxy;
        this.addUserUsecaseProxy = addUserUsecaseProxy;
        this.loginUsecaseProxy = loginUsecaseProxy;
    }
    async getUser(id) {
        const user = await this.getUserUsecaseProxy.getInstance().execute(id);
        if (!user) {
            this.exceptionsService.NotFoundException();
        }
        return new user_presenter_1.UserPresenter(user);
    }
    async getUsers() {
        const users = await this.getAllUserUsecaseProxy.getInstance().execute();
        return users.map((user) => new user_presenter_1.UserPresenter(user));
    }
    async updateUser(id, updateUserDto) {
        await this.updateUserUsecaseProxy.getInstance().execute(id, updateUserDto);
        return;
    }
    async deleteUser(id) {
        await this.deleteUserUsecaseProxy.getInstance().execute(id);
        return;
    }
    async addUser(addUserDto) {
        const { email, password, role } = addUserDto;
        await this.addUserUsecaseProxy.getInstance().execute(email, password, role);
        return;
    }
    async login(addUserDto) {
        const { email, password } = addUserDto;
        const user = await this.loginUsecaseProxy.getInstance().execute(email, password);
        if (!user) {
            this.exceptionsService.UnauthorizedException();
        }
        return new user_presenter_1.UserPresenter(user);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Get)('user'),
    (0, response_decorator_1.ApiResponseType)(user_presenter_1.UserPresenter, false),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUser", null);
__decorate([
    (0, common_1.Get)('users'),
    (0, response_decorator_1.ApiResponseType)(user_presenter_1.UserPresenter, true),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, common_1.Put)('user'),
    (0, response_decorator_1.ApiResponseType)(user_presenter_1.UserPresenter, true),
    __param(0, (0, common_1.Query)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectId, user_1.UserMWithoutPassword]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
__decorate([
    (0, common_1.Delete)('user'),
    (0, response_decorator_1.ApiResponseType)(user_presenter_1.UserPresenter, true),
    __param(0, (0, common_1.Query)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_1.ObjectId]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, common_1.Post)('user'),
    (0, response_decorator_1.ApiResponseType)(user_presenter_1.UserPresenter, true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "addUser", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, response_decorator_1.ApiResponseType)(user_presenter_1.UserPresenter, true),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.AddUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    (0, swagger_1.ApiTags)('user'),
    (0, swagger_1.ApiResponse)({ status: 500, description: 'Internal error' }),
    (0, swagger_1.ApiExtraModels)(user_presenter_1.UserPresenter),
    __param(1, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.GET_USER_USECASES_PROXY)),
    __param(2, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.GET_USERS_USECASES_PROXY)),
    __param(3, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.PUT_USER_USECASES_PROXY)),
    __param(4, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.DELETE_USER_USECASES_PROXY)),
    __param(5, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.POST_USER_USECASES_PROXY)),
    __param(6, (0, common_1.Inject)(usecases_proxy_module_1.UsecasesProxyModule.POST_LOGIN_USECASES_PROXY)),
    __metadata("design:paramtypes", [exceptions_service_1.ExceptionsService,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy,
        usecases_proxy_1.UseCaseProxy])
], UserController);
//# sourceMappingURL=user.controller.js.map