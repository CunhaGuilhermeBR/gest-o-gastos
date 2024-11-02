import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsObject, IsString, IsOptional } from 'class-validator';
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
}
