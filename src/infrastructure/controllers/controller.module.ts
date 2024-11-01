import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UserController } from './user/user.controller';
import { ExceptionsModule } from '../exceptions/exceptions.module';

@Module({
  imports: [UsecasesProxyModule.register(), ExceptionsModule],
  controllers: [UserController],
})
export class ControllersModule {}