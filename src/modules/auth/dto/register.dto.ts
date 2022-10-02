import { IsNotEmpty, IsString } from '@nestjs/class-validator';
import { IsObject } from 'class-validator';

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

  @IsNotEmpty()
  @IsObject()
  address: object;
}
