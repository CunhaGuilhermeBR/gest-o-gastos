import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Category {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  name: string;

  @Column('string', { nullable: true })
  description?: string;

  @CreateDateColumn({ name: 'create_date' })
  create_date: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updated_date: Date;
}
