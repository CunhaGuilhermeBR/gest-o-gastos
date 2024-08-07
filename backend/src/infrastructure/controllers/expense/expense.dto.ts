import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsString, IsDate } from 'class-validator';
import { ObjectId } from 'typeorm';

export class ExpenseDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsObject()
  readonly _id: ObjectId;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsObject()
  readonly user_id: ObjectId;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly value: number;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly type: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  readonly updated_date: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  readonly create_date: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  readonly transaction_date: Date;
}
