import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Expense {
  @ObjectIdColumn()
  _id: ObjectId;

  @ObjectIdColumn()
  user_id: ObjectId;

  @Column()
  name: string;

  @Column('double')
  value: number;

  @Column()
  type: string;

  @Column()
  transaction_date: Date;

  @CreateDateColumn({ name: 'create_date' })
  create_date: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updated_date: Date;
}
