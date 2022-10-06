import {
  IsNumber,
  IsNotEmpty,
  IsString,
  MinLength,
} from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ValidateIf } from 'class-validator';
import { City } from '../entities/city.entitiy';

export class TypeAddressDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  readonly street: string;

  @ApiProperty()
  @IsNumber()
  public cityId: number;
}
