import { ObjectId } from "typeorm";

export class ExpenseM {
    _id: ObjectId;
    user_id: ObjectId;
    name: string;
    value: number;
    type: string;
    transaction_date: Date;
    create_date: Date;
    updated_date: Date;
  }
