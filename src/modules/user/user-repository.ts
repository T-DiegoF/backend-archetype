import { Inject, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { DataSource } from 'typeorm';
import { Logger } from 'winston';
import { User } from '../auth/entities/user.entity';
import { UserResponse } from './interfaces/user.interface';

@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  async findUsername(username: any): Promise<User> {
    try {
      this.logger.info('searching user by username', {
        repository: UserRepository.name,
      });
      const [result] = await this.dataSource.query(
        'SELECT * FROM `User` WHERE `username` = ?',
        [`${username}`],
      );

      return result;
    } catch (err) {
      this.logger.error(
        'Error findUsername():',
        err.message,
        UserRepository.name,
      );
      throw new Error(err.stack);
    }
  }

  async findUser(id: number): Promise<UserResponse> {
    try {
      this.logger.info('searching user by req.user.id', {
        repository: UserRepository.name,
      });
      const row = await this.dataSource.query(
        'SELECT profile.name AS name, city.name AS city, country.name AS country, user.id AS id, profile.name AS name, address.street AS street FROM user INNER JOIN profile ON user.id = profile.userId INNER JOIN address ON profile.addressId = address.id INNER JOIN city ON address.cityId = city.id INNER JOIN country ON city.countryId = country.id where user.id = ?',
        [id],
      );

      return row;
    } catch (err) {
      this.logger.error('Error findUser():', err.message, UserRepository.name);
      throw new Error(err.stack);
    }
  }
}
