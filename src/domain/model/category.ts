import { ObjectId } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export class CategoryM {
    _id: ObjectId;
    name: string;
    description?: string;
    create_date: Date;
    updated_date: Date;
}

