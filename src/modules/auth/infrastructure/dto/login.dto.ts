import { IsNotEmpty, IsString } from '@nestjs/class-validator';

export class LoginDTO {
  @IsNotEmpty()
  @IsString()
  username: String;

  @IsNotEmpty()
  @IsString()
  password: String;
}
