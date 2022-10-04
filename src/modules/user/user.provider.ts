import { Injectable } from '@nestjs/common';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository) { }

  async findUser(id: any): Promise<void> {
    return this.userRepository.findUser(id);
  }
}
