import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsObject, IsOptional, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

export class UpdateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsObject()
  readonly _id: ObjectId;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly name?: string;

  @ApiProperty({ required: false })
  @IsOptional() 
  @IsString()
  readonly description?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  readonly price?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  readonly options?: string[];

  @ApiProperty({ required: false })
  @IsOptional()
  readonly active?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  readonly category_id?: ObjectId;
}

export class AddProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString({ each: true })
  readonly options?: string[];

  @ApiProperty({ required: true })
  @IsNotEmpty()
  readonly active: boolean;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsObject()
  readonly category_id: ObjectId;
}
