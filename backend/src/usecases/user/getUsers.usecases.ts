import { UserMWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';

export class GetUsersUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserMWithoutPassword[]> {
    return await this.userRepository.findAll();
  }
}