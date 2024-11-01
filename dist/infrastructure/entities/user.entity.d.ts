import { ObjectId } from 'typeorm';
export declare enum UserRole {
    ADMIN = "admin",
    USER = "user"
}
export declare class User {
    _id: ObjectId;
    email: string;
    password: string;
    role: UserRole;
    create_date: Date;
    updated_date: Date;
}
