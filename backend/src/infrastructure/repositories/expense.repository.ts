import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExpenseM } from '../../domain/model/expense';
import { ExpenseRepository } from '../../domain/repositories/expense.interface.repository';
import { Expense } from '../entities/expense.entity';
import { MongoClient, ObjectId } from 'mongodb';
import { ExpenseAggregationResult } from '../../domain/expense_aggregation.interface';

@Injectable()
export class DatabaseExpenseRepository implements ExpenseRepository {
    constructor(
        @InjectRepository(Expense)
        private readonly expenseEntityRepository: Repository<Expense>,
        @Inject('DATABASE_CONNECTION') private readonly mongoClient: MongoClient
    ) { }

    async insert(expense: ExpenseM): Promise<void> {
        expense.user_id = new ObjectId(expense.user_id);
        await this.expenseEntityRepository.insert(this.toExpenseEntity(expense));
    }

    async findAll(user_id?: ObjectId): Promise<ExpenseM[]> {
        const where = user_id ? { user_id: new ObjectId(user_id) } : {};
        const expensesEntity = await this.expenseEntityRepository.find({
            where,
            order: {
                transaction_date: 'DESC',
            },
        });
        return expensesEntity.map((expenseEntity) => this.toExpense(expenseEntity));
    }

    private readonly monthNames: { [key: number]: string } = {
        1: 'Janeiro', 2: 'Fevereiro', 3: 'Março', 4: 'Abril', 5: 'Maio', 6: 'Junho',
        7: 'Julho', 8: 'Agosto', 9: 'Setembro', 10: 'Outubro', 11: 'Novembro', 12: 'Dezembro'
    };

    private returnNameMonth(month: string): string {
        return this.monthNames[month] || 'Mês inválido';
    }

    async aggregatePerMonth(user_id: ObjectId): Promise<ExpenseAggregationResult[]> {
        const pipeline = [
            { $match: { user_id: new ObjectId(user_id) } },
            {
                $group: {
                    _id: {
                        year: { $year: "$transaction_date" },
                        month: { $month: "$transaction_date" }
                    },
                    total: { $sum: "$value" }
                }
            },
            { $sort: { "_id.year": -1, "_id.month": -1 } }
        ];
        const db = this.mongoClient.db();
        const results = await db.collection('expense').aggregate(pipeline).toArray();
        return results.map(result => ({
            year: result._id.year,
            month: this.returnNameMonth(result._id.month),
            total: result.total
        })
        );
    }

    async findById(id: ObjectId): Promise<ExpenseM> {
        const expenseEntity = await this.expenseEntityRepository.findOne({ where: { _id: new ObjectId(id) } });
        if (!expenseEntity) {
            return null;
        }
        return this.toExpense(expenseEntity);
    }

    async updateContent(id: ObjectId, data: ExpenseM): Promise<void> {
        data.updated_date = new Date();
        data.transaction_date = new Date(data.transaction_date || new Date());
        data.value = Number(data.value)
        delete data.user_id;
        delete data.create_date;
        await this.expenseEntityRepository.update(
            { _id: new ObjectId(id) },
            data,
        );
    }

    async deleteById(id: ObjectId): Promise<void> {
        await this.expenseEntityRepository.delete({ _id: new ObjectId(id) });
    }

    private toExpense(expenseEntity: Expense): ExpenseM {
        const expense: ExpenseM = new ExpenseM();

        expense._id = expenseEntity._id;
        expense.user_id = expenseEntity.user_id;
        expense.name = expenseEntity.name;
        expense.value = expenseEntity.value;
        expense.type = expenseEntity.type;
        expense.create_date = expenseEntity.create_date;
        expense.updated_date = expenseEntity.updated_date;
        expense.transaction_date = new Date(expenseEntity.transaction_date);

        return expense;
    }

    private toExpenseEntity(expense: ExpenseM): Expense {
        const expenseEntity: Expense = new Expense();

        expenseEntity._id = new ObjectId();
        expenseEntity.user_id = expense.user_id;
        expenseEntity.name = expense.name;
        expenseEntity.value = expense.value;
        expenseEntity.type = expense.type;
        expenseEntity.create_date = new Date();
        expenseEntity.updated_date = new Date();
        expenseEntity.transaction_date = new Date(expense.transaction_date) ?? new Date();

        return expenseEntity;
    }
}
