import { ObjectId } from 'typeorm';
import { ExpenseRepository } from '../../domain/repositories/expense.interface.repository';
import { ExpenseM } from '../../domain/model/expense';

export class GetExpenseUseCases {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(id: ObjectId): Promise<ExpenseM> {
    return await this.expenseRepository.findById(id);
  }
}