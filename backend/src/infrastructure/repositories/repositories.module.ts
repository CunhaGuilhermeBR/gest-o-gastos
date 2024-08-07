import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
import { User } from '../entities/user.entity';
import { DatabaseUserRepository } from './user.repository';
import { DatabaseExpenseRepository } from './expense.repository';
import { Expense } from '../entities/expense.entity';
import { DatabaseModule } from '../config/mongodb/mongodb.module';

@Module({
  imports: [TypeOrmConfigModule, DatabaseModule ,TypeOrmModule.forFeature([User, Expense])],
  providers: [DatabaseUserRepository, DatabaseExpenseRepository],
  exports: [DatabaseUserRepository, DatabaseExpenseRepository],
})
export class RepositoriesModule {}