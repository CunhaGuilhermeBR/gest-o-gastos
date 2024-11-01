import { ObjectId } from "typeorm";
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class UserMWithoutPassword {
    _id: ObjectId;
    email: string;
    role: UserRole;
    create_date: Date;
    updated_date: Date;
}
export declare class UserM extends UserMWithoutPassword {
    password: string;
}
