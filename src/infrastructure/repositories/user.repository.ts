import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserM, UserMWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import { User } from '../entities/user.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
    constructor(
        @InjectRepository(User)
        private readonly userEntityRepository: Repository<User>,
    ) { }

    async updateContent(id: ObjectId, data: UserMWithoutPassword): Promise<void> {
        data.updated_date = new Date();
        delete data.create_date;
        await this.userEntityRepository.update(
            {
                _id: new ObjectId(id),
            },
            data,
        );
    }
    async insert(user: UserM): Promise<void> {
        await this.userEntityRepository.insert(this.toUserEntity(user));
    }
    async findAll(): Promise<UserMWithoutPassword[]> {
        const usersEntity = await this.userEntityRepository.find();
        return usersEntity.map((userEntity) => this.user(userEntity));
    }
    async findById(id: ObjectId): Promise<UserMWithoutPassword> {
        return await this.userEntityRepository.findOne({ where: { _id: new ObjectId(id) } });
    }
    async findByUsername(email: string): Promise<UserM> {
        return await this.userEntityRepository.findOne({ where: { email: email } });
    }

    async deleteById(id: ObjectId): Promise<void> {
        await this.userEntityRepository.delete({ _id: new ObjectId(id) });
    }

    private user(userEntity: User): UserM {
        const user: UserM = new UserM();

        user._id = userEntity._id;
        user.password = userEntity.password;
        user.email = userEntity.email;
        user.role = userEntity.role;
        user.create_date = userEntity.create_date;
        user.updated_date = userEntity.updated_date;

        return user;
    }

    private toUserEntity(user: UserM): User {
        const userEntity: User = new User();

        userEntity._id = new ObjectId();
        userEntity.email = user.email;
        userEntity.role = user.role;
        userEntity.password = user.password
        userEntity.create_date = new Date()
        userEntity.updated_date = new Date()

        return userEntity;
    }
}