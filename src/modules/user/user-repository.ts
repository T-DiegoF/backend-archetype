import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { Request } from 'express';
import { DataSource } from 'typeorm';
import { User } from '../auth/entities/user.entity';

@Injectable()
export class UserRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) { }

  async findUsername(username: any): Promise<User> {
    try {
      const [result] = await this.dataSource.query(
        'SELECT * FROM `User` WHERE `username` = ?',
        [`${username}`],
      );

      return result;
    } catch (error) {
      console.log('ERROR findOne', error);
    }
  }

  async findUser(id: any) {
    try {
      const [row] = await this.dataSource.query(
        'SELECT * FROM `user` INNER JOIN `profile` ON `user`.`id` = ?' +
        'INNER JOIN `address` ON `profile`.`addressId` = `address`.`id`' +
        'INNER JOIN `city` ON `address`.`id` = `city`.`id`' +
        'INNER JOIN `country` ON `city`.`countryId` = `country`.`id`',
        [`${id}`]

      );

      return row;
    } catch (error) {
      console.log('ERROR findOne', error);
    }
  }

}

