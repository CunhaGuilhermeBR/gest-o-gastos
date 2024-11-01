import { ObjectId } from 'typeorm';
import { UserM, UserMWithoutPassword } from '../model/user';

export interface UserRepository {
  insert(user: UserM): Promise<void>;
  findAll(): Promise<UserMWithoutPassword[]>;
  findById(id: ObjectId): Promise<UserMWithoutPassword>;
  updateContent(id: ObjectId, data: UserMWithoutPassword): Promise<void>;
  deleteById(id: ObjectId): Promise<void>;
  findByUsername(username: string): Promise<UserM>;
}