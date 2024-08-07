import { ApiProperty } from '@nestjs/swagger';
import { ExpenseM } from '../../../domain/model/expense';
import { ObjectId } from 'typeorm';

export class ExpensePresenter {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  user_id: ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  type: string;

  @ApiProperty()
  transaction_date: Date;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  updated_date: Date;

  constructor(expense: ExpenseM) {
    this._id = expense._id;
    this.user_id = expense.user_id;
    this.name = expense.name;
    this.value = expense.value;
    this.type = expense.type;
    this.create_date = expense.create_date;
    this.updated_date = expense.updated_date;
    this.transaction_date = expense.transaction_date;
  }
}
