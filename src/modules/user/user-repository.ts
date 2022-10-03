import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async findOne(username: string) {
    try {
      const rows = await this.dataSource.query(
        'SELECT id,username FROM `User` WHERE `username` = ?',
        [username],
      );
      return rows;
    } catch (error) {
      console.log('ERROR findOne', error);
    }
  }
}
