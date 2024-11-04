import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, IsOptional, IsNumber,  } from 'class-validator';
import { ObjectId } from 'typeorm';

export class UpdateCategoryDto {
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
  @IsNumber()
  readonly order?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;
}

export class AddCategoryDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly description?: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsNumber()
  readonly order: number;
}
