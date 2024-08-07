import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { ObjectId } from 'typeorm';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsObject()
  readonly _id: ObjectId;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  readonly last_login: Date;
}

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly username: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}