import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { ExpenseRepository } from '../../domain/repositories/expense.interface.repository';

export class DeleteExpenseUseCases {
  constructor(private readonly logger: ILogger, private readonly expenseRepository: ExpenseRepository) {}

  async execute(id: ObjectId): Promise<void> {
    await this.expenseRepository.deleteById(id);
    this.logger.log('DeleteExpenseUseCases execute', `Expense ${id} have been deleted`);
  }
}