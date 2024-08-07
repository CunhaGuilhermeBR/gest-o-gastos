import { ObjectId } from 'typeorm';
import { ExpenseRepository } from '../../domain/repositories/expense.interface.repository';
import { ExpenseAggregationResult } from '../../domain/expense_aggregation.interface';

export class AggregateExpenseUseCases {
  constructor(private readonly expenseRepository: ExpenseRepository) {}

  async execute(id: ObjectId): Promise<ExpenseAggregationResult[]> {
    return await this.expenseRepository.aggregatePerMonth(id);
  }
}