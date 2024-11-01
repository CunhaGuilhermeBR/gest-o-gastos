import { ObjectId } from 'typeorm';
import { UserMWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
export declare class GetUserUseCases {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(id: ObjectId): Promise<UserMWithoutPassword>;
}
