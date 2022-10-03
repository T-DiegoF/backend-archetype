import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findOne(username: any): Promise<User> {
    try {
      const [result] = await this.dataSource.query(
        'SELECT * FROM `User` WHERE `username` = ?',
        username,
      );

      return result;
    } catch (error) {
      console.log('ERROR findOne', error);
    }
  }
}
