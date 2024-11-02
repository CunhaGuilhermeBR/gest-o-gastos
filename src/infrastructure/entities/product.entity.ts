import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectId } from 'typeorm';

@Entity()
export class Product {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  name: string;

  @Column('string', { nullable: true }) 
  description?: string;

  @Column('decimal')
  price: number;

  @Column('string', { nullable: true }) 
  options?: string[];

  @Column('boolean', { default: true })
  active: boolean;

  @Column('string')
  category_id: ObjectId;

  @CreateDateColumn({ name: 'create_date' })
  create_date: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updated_date: Date;
}
