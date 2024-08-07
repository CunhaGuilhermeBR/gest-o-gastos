import { ObjectId } from 'typeorm';
import { ExpenseM } from '../model/expense';

export interface ExpenseRepository {
  insert(user: ExpenseM): Promise<void>;
  findAll(user_id: ObjectId): Promise<ExpenseM[]>;
  findById(id: ObjectId): Promise<ExpenseM>;
  updateContent(id: ObjectId, data: ExpenseM): Promise<void>;
  deleteById(id: ObjectId): Promise<void>;
  aggregatePerMonth(user_id: ObjectId): Promise<any[]>;
}