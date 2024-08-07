import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { UserController } from './user/user.controller';
import { ExceptionsModule } from '../exceptions/exceptions.module';
import { ExpenseController } from './expense/expense.controller';

@Module({
  imports: [UsecasesProxyModule.register(), ExceptionsModule],
  controllers: [UserController, ExpenseController],
})
export class ControllersModule {}