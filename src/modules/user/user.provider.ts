import { Inject, Injectable } from '@nestjs/common';
import { LoginDTO } from '../auth/dto/login.dto';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService {}
