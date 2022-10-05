import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDefined, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';
import { Address } from '../entities/address.entity';
import { City } from '../entities/city.entitiy';
import { TypeAddressDTO } from './address.type';


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
  @ValidateNested()
  @Type(() => TypeAddressDTO)
  address: TypeAddressDTO;
}
