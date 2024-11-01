import { UserMWithoutPassword } from '../../../domain/model/user';
import { ObjectId } from 'typeorm';
export declare class UserPresenter {
    _id: ObjectId;
    email: string;
    role: string;
    create_date: Date;
    updated_date: Date;
    constructor(user: UserMWithoutPassword);
}
