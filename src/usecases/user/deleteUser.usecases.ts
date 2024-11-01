import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';

export class DeleteUserUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: UserRepository) {}

  async execute(id: ObjectId): Promise<void> {
    await this.userRepository.deleteById(id);
    this.logger.log('DeleteUserUseCases execute', `User ${id} have been deleted`);
  }
}