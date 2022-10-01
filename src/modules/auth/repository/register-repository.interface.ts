import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';

export interface IUserAuthRepository {
  register(userRegister: RegisterDTO): any;
  login(userLogin: LoginDTO): any;
  /*   verifyJwt(jwt: string): Promise<any>;
    generateJwt(user: User): Promise<string>; */
}
