import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { RouterLoggerMiddleware } from './router.logger.middleware';

@Module({
    imports: [ExceptionsModule, LoggerModule],
})
@Module({})
export class MiddlewareModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RouterLoggerMiddleware)
            .forRoutes('*')
    }
}
