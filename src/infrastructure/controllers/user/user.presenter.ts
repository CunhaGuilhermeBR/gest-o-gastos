import { ApiProperty } from '@nestjs/swagger';
import { UserMWithoutPassword } from '../../../domain/model/user';
import { ObjectId } from 'typeorm';

export class UserPresenter {
  @ApiProperty()
  _id: ObjectId;
  @ApiProperty()
  email: string;
  @ApiProperty()
  role: string;
  @ApiProperty()
  create_date: Date;
  @ApiProperty()
  updated_date: Date;

  constructor(user: UserMWithoutPassword) {
    this._id = user._id;
    this.role = user.role;
    this.email = user.email;
    this.create_date = user.create_date;
    this.updated_date = user.updated_date;
  }
}