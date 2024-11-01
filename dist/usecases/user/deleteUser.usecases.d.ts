import { ObjectId } from 'typeorm';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
export declare class DeleteUserUseCases {
    private readonly logger;
    private readonly userRepository;
    constructor(logger: ILogger, userRepository: UserRepository);
    execute(id: ObjectId): Promise<void>;
}
