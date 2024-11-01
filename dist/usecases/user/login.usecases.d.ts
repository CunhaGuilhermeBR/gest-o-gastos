import { UserMWithoutPassword } from 'src/domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
export declare class LoginUseCases {
    private readonly userRepository;
    constructor(userRepository: UserRepository);
    execute(username: string, password: string): Promise<UserMWithoutPassword>;
}
