import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) { }


  async findUser(id: any): Promise<void> {

    try {
      this.logger.info('Calling UserService()');
      return this.userRepository.findUser(id);
    } catch (err) {
      this.logger.error('Error UserService():', err.message, UserRepository.name);
      throw new Error(err.stack);

    }

  }
}
