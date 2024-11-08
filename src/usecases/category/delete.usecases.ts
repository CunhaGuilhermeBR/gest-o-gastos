import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { CategoryRepository } from '../../domain/repositories/category.interface.repository';
import { UserMWithoutPassword } from 'src/domain/model/user';
import { UserRepository } from 'src/domain/repositories/user.inteface.repository';
import { UnauthorizedException } from '@nestjs/common';

export class DeleteCategoryUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly categoryRepository: CategoryRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute(id: ObjectId, user: UserMWithoutPassword): Promise<void> {
    const exists = await this.userRepository.findById(user._id)
    if(!exists){
      throw new UnauthorizedException('Usuário não existe!')
    }
    await this.categoryRepository.deleteById(id);
    this.logger.log('DeleteCategoryUseCases execute', `Category ${id} has been deleted`);
  }
}
