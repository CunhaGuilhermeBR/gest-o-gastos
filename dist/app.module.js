"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const environment_config_module_1 = require("./infrastructure/config/environment-config/environment-config.module");
const typeorm_module_1 = require("./infrastructure/config/typeorm/typeorm.module");
const logger_module_1 = require("./infrastructure/logger/logger.module");
const repositories_module_1 = require("./infrastructure/repositories/repositories.module");
const controller_module_1 = require("./infrastructure/controllers/controller.module");
const middleware_module_1 = require("./infrastructure/middleware/middleware.module");
const mongodb_module_1 = require("./infrastructure/config/mongodb/mongodb.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [environment_config_module_1.EnvironmentConfigModule, mongodb_module_1.DatabaseModule, typeorm_module_1.TypeOrmConfigModule, logger_module_1.LoggerModule, repositories_module_1.RepositoriesModule, controller_module_1.ControllersModule, middleware_module_1.MiddlewareModule],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map