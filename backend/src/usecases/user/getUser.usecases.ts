import { ObjectId } from 'typeorm';
import { UserMWithoutPassword } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';

export class GetUserUseCases {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(id: ObjectId): Promise<UserMWithoutPassword> {
    return await this.userRepository.findById(id);
  }
}