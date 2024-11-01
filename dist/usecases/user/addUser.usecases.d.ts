import { ExceptionsService } from '../../infrastructure/exceptions/exceptions.service';
import { ILogger } from '../../domain/logger/logger.interface';
import { UserRole } from '../../domain/model/user';
import { UserRepository } from '../../domain/repositories/user.inteface.repository';
export declare class AddUserUseCases {
    private readonly logger;
    private readonly userRepository;
    private readonly exceptionsService;
    constructor(logger: ILogger, userRepository: UserRepository, exceptionsService: ExceptionsService);
    execute(email: string, password: string, role: UserRole): Promise<void>;
}
