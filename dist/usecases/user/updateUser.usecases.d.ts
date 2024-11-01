import { UserMWithoutPassword } from '../../domain/model/user';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
import { ObjectId } from 'typeorm';
export declare class UpdateUserUseCases {
    private readonly logger;
    private readonly userRepository;
    constructor(logger: ILogger, userRepository: UserRepository);
    execute(id: ObjectId, data: UserMWithoutPassword): Promise<void>;
}
