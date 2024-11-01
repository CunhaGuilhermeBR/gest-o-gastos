"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControllersModule = void 0;
const common_1 = require("@nestjs/common");
const usecases_proxy_module_1 = require("../usecases-proxy/usecases-proxy.module");
const user_controller_1 = require("./user/user.controller");
const exceptions_module_1 = require("../exceptions/exceptions.module");
let ControllersModule = class ControllersModule {
};
exports.ControllersModule = ControllersModule;
exports.ControllersModule = ControllersModule = __decorate([
    (0, common_1.Module)({
        imports: [usecases_proxy_module_1.UsecasesProxyModule.register(), exceptions_module_1.ExceptionsModule],
        controllers: [user_controller_1.UserController],
    })
], ControllersModule);
//# sourceMappingURL=controller.module.js.map