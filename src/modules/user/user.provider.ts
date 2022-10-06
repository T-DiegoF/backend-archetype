import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { UserResponse } from './interfaces/user.interface';
import { UserRepository } from './user-repository';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
    @Inject(CACHE_MANAGER) protected readonly cacheManager,
  ) {}

  async findUser(id: number): Promise<UserResponse> {
    try {
      await this.logger.info('Calling UserService()');
      return this.userRepository.findUser(id);
    } catch (err) {
      this.logger.error(
        'Error UserService():',
        err.message,
        UserRepository.name,
      );
      throw new Error(err.stack);
    }
  }
}
