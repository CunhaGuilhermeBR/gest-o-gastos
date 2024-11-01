import { UserRole } from 'src/domain/model/user';
import { ObjectId } from 'typeorm';
export declare class UpdateUserDto {
    readonly _id: ObjectId;
    readonly email: string;
    readonly role: UserRole;
}
export declare class AddUserDto {
    readonly email: string;
    readonly password: string;
    readonly role: UserRole;
}
