import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UserPresenter } from './user.presenter';
import { AddUserDto } from './user.dto';
import { GetUserUseCases } from '../../../usecases/user/getUser.usecases';
import { GetUsersUseCases } from '../../../usecases/user/getUsers.usecases';
import { UpdateUserUseCases } from '../../../usecases/user/updateUser.usecases';
import { DeleteUserUseCases } from '../../../usecases/user/deleteUser.usecases';
import { AddUserUseCases } from '../../../usecases/user/addUser.usecases';
import { UserMWithoutPassword } from '../../../domain/model/user';
import { ObjectId } from 'typeorm';
import { LoginUseCases } from '../../../usecases/user/login.usecases';
import { ExceptionsService } from '../../exceptions/exceptions.service';
export declare class UserController {
    private readonly exceptionsService;
    private readonly getUserUsecaseProxy;
    private readonly getAllUserUsecaseProxy;
    private readonly updateUserUsecaseProxy;
    private readonly deleteUserUsecaseProxy;
    private readonly addUserUsecaseProxy;
    private readonly loginUsecaseProxy;
    constructor(exceptionsService: ExceptionsService, getUserUsecaseProxy: UseCaseProxy<GetUserUseCases>, getAllUserUsecaseProxy: UseCaseProxy<GetUsersUseCases>, updateUserUsecaseProxy: UseCaseProxy<UpdateUserUseCases>, deleteUserUsecaseProxy: UseCaseProxy<DeleteUserUseCases>, addUserUsecaseProxy: UseCaseProxy<AddUserUseCases>, loginUsecaseProxy: UseCaseProxy<LoginUseCases>);
    getUser(id: ObjectId): Promise<UserPresenter>;
    getUsers(): Promise<UserPresenter[]>;
    updateUser(id: ObjectId, updateUserDto: UserMWithoutPassword): Promise<void>;
    deleteUser(id: ObjectId): Promise<void>;
    addUser(addUserDto: AddUserDto): Promise<void>;
    login(addUserDto: AddUserDto): Promise<UserPresenter>;
}
