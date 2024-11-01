import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNotEmpty, IsNumber, IsObject, IsString } from 'class-validator';
import { UserRole } from 'src/domain/model/user';
import { ObjectId } from 'typeorm';

export class UpdateUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsObject()
  readonly _id: ObjectId;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly role: UserRole;
}

export class AddUserDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly email: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly role: UserRole;
}