import { IsNotEmpty, IsString, ValidateNested } from '@nestjs/class-validator';
import { Type } from 'class-transformer';
import { IsObject } from 'class-validator';
import { Address } from '../entities/address.entity';
import { User } from '../entities/user.entity';
import { TypeAddress } from './address.type';

export class RegisterDTO {

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsObject()
  address: Partial<Address>;
}
