import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
