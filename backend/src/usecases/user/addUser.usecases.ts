import { ExceptionsService } from '../../infrastructure/exceptions/exceptions.service';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import bcrypt from 'bcryptjs';

export class AddUserUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: UserRepository, private readonly exceptionsService: ExceptionsService) { }

  async execute(
    username: string,
    password: string,

  ): Promise<void> {
    const exists = await this.userRepository.findByUsername(username);
    if (exists) {
      return this.exceptionsService.BadRequestException({
        message: 'Já existe um usuário com esse username'
      })
    };
    const user = new UserM();
    user.password = await bcrypt.hash(password, 10);
    user.username = username;
    await this.userRepository.insert(user);
    this.logger.log('AddUserUseCases execute', 'New user have been inserted');
  }
}