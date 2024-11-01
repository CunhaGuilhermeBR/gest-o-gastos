import { ExceptionsService } from '../../infrastructure/exceptions/exceptions.service';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserM, UserRole } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import * as bcrypt from 'bcrypt';

export class AddUserUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: UserRepository, private readonly exceptionsService: ExceptionsService) { }

  async execute(
    email: string,
    password: string,
    role: UserRole

  ): Promise<void> {
    const exists = await this.userRepository.findByUsername(email);
    if (exists) {
      return this.exceptionsService.BadRequestException({
        message: 'Já existe um usuário com esse email'
      })
    };
    const user = new UserM();
    user.password = await bcrypt.hash(password, 10);
    user.email = email;
    user.role = role || UserRole.USER
    await this.userRepository.insert(user);
    this.logger.log('AddUserUseCases execute', 'New user have been inserted');
  }
}