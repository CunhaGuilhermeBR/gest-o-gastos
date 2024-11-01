import { Module } from '@nestjs/common';

import { EnvironmentConfigModule } from './infrastructure/config/environment-config/environment-config.module';
import { TypeOrmConfigModule } from './infrastructure/config/typeorm/typeorm.module';
import { LoggerModule } from './infrastructure/logger/logger.module';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controller.module';
import { MiddlewareModule } from './infrastructure/middleware/middleware.module';
import { DatabaseModule } from './infrastructure/config/mongodb/mongodb.module';

@Module({
  imports: [EnvironmentConfigModule, DatabaseModule, TypeOrmConfigModule, LoggerModule, RepositoriesModule, ControllersModule, MiddlewareModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
