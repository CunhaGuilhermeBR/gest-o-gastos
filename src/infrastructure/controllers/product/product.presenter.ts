import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from '../../../domain/model/product';
import { ObjectId } from 'typeorm';

export class ProductPresenter {
  @ApiProperty()
  _id: ObjectId;

  @ApiProperty()
  name: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  active: boolean;

  @ApiProperty({ required: false })
  options?: string[];

  @ApiProperty()
  category_id: ObjectId | string;

  @ApiProperty()
  create_date: Date;

  @ApiProperty()
  updated_date: Date;

  constructor(product: ProductM) {
    this._id = product._id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.active = product.active;
    this.options = product.options;
    this.category_id = product.category_id;
    this.create_date = product.create_date;
    this.updated_date = product.updated_date;
  }
}
