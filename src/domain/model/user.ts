import { ObjectId } from "typeorm";

export enum UserRole {
  ADMIN = "admin",
  USER = "user",
}

export class UserMWithoutPassword {
  _id: ObjectId;
  email: string;
  role: UserRole;
  create_date: Date;
  updated_date: Date;
}

export class UserM extends UserMWithoutPassword {
  password: string;
}