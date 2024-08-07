import { UserMWithoutPassword } from 'src/domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import bcrypt from 'bcryptjs';

export class LoginUseCases {
    constructor(private readonly userRepository: UserRepository) { }

    async execute(username: string, password: string): Promise<UserMWithoutPassword> {
        const user = await this.userRepository.findByUsername(username);
        if (!user) {
            return null;
        }
        const match = await bcrypt.compare(password, user.password);
        if(match && user){
            const up_login = new UserMWithoutPassword();
            up_login.last_login = new Date();
            await this.userRepository.updateContent(user._id, up_login);
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
}