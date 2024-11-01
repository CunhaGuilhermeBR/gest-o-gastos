import { UserMWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
export declare class GetUsersUseCases {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(): Promise<UserMWithoutPassword[]>;
}
