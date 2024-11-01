"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const logger_service_1 = require("./infrastructure/logger/logger.service");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const port = +process.env.APP_PORT ?? 8080;
    app.use(cors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        allowedHeaders: 'Content-Type, Authorization',
        credentials: true,
    }));
    new logger_service_1.LoggerService().log('Application start', `App running in port [${port}]`);
    await app.listen(port);
}
bootstrap();
//# sourceMappingURL=main.js.map