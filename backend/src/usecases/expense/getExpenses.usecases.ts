import { ExpenseRepository } from '../../domain/repositories/expense.interface.repository';
import { ExpenseM } from '../../domain/model/expense';
import { ObjectId } from 'typeorm';

export class GetExpensesUseCases {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(user_id: ObjectId): Promise<ExpenseM[]> {
    return await this.expenseRepository.findAll(user_id);
  }
}