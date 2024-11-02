import { ObjectId } from "typeorm";

export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export class ProductM {
    _id: ObjectId;
    name: string;
    description?: string;
    price: number;
    options?: string[];
    active: boolean;
    category_id: ObjectId;
    create_date: Date;
    updated_date: Date;
}

