import { ObjectId } from "typeorm";

export class UserMWithoutPassword {
    _id: ObjectId;
    username: string;
    create_date: Date;
    updated_date: Date;
    last_login?: Date;
  }
  
  export class UserM extends UserMWithoutPassword {
    password: string;
  }