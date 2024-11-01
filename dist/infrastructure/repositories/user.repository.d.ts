import { Repository } from 'typeorm';
import { UserM, UserMWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import { User } from '../entities/user.entity';
import { ObjectId } from 'mongodb';
export declare class DatabaseUserRepository implements UserRepository {
    private readonly userEntityRepository;
    constructor(userEntityRepository: Repository<User>);
    updateContent(id: ObjectId, data: UserMWithoutPassword): Promise<void>;
    insert(user: UserM): Promise<void>;
    findAll(): Promise<UserMWithoutPassword[]>;
    findById(id: ObjectId): Promise<UserMWithoutPassword>;
    findByUsername(email: string): Promise<UserM>;
    deleteById(id: ObjectId): Promise<void>;
    private user;
    private toUserEntity;
}
