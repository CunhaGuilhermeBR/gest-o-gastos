import { UserMWithoutPassword } from '../../domain/model/user';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import { ObjectId } from 'typeorm';

export class UpdateUserUseCases {
  constructor(private readonly logger: ILogger, private readonly userRepository: UserRepository) {}

  async execute(id: ObjectId, data: UserMWithoutPassword): Promise<void> {
    await this.userRepository.updateContent(id, data);
    this.logger.log('UpdateUserUseCases execute', `User ${id} have been updated`);
  }
}