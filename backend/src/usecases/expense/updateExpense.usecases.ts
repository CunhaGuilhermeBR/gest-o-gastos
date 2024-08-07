import { ILogger } from '../../domain/logger/logger.interface';
import { ExpenseM } from '../../domain/model/expense';
import { ExpenseRepository } from '../../domain/repositories/expense.interface.repository';
import { ObjectId } from 'typeorm';

export class UpdateExpenseUseCases {
  constructor(
    private readonly logger: ILogger, 
    private readonly expenseRepository: ExpenseRepository
  ) {}

  async execute(id: ObjectId, data: ExpenseM): Promise<void> {
    await this.expenseRepository.updateContent(id, data);
    this.logger.log('UpdateExpenseUseCases execute', `Expense ${id} has been updated`);
  }
}
