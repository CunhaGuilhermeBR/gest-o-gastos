import { Entity, Column, CreateDateColumn, UpdateDateColumn, ObjectIdColumn, ObjectId } from 'typeorm';

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

@Entity()
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column('string')
  email: string;

  @Column('string')
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.USER, 
  })
  role: UserRole;

  @CreateDateColumn({ name: 'create_date' })
  create_date: Date;

  @UpdateDateColumn({ name: 'updated_date' })
  updated_date: Date;
}
