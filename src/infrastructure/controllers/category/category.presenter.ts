import { ApiProperty } from '@nestjs/swagger';
import { CategoryM } from '../../../domain/model/category';
import { ObjectId } from 'typeorm';

export class CategoryPresenter {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty()
  order: number;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  updated_date: Date;

  constructor(category: CategoryM) {
    this._id = category._id;
    this.name = category.name;
    this.description = category.description;
    this.create_date = category.create_date;
    this.updated_date = category.updated_date;
    this.order = category.order
  }
}
