import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Address } from '../../domain/entities/address.entity';
import { Profile } from '../../domain/entities/profile.entity';
import { User } from '../../domain/entities/user.entity';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { IUserAuthRepository } from './register-repository.interface';

@Injectable()
export class UserAuthRepository implements IUserAuthRepository {
  constructor(private dataSource: DataSource) { }

  async register(registerDTO: RegisterDTO) {
    const { username, password, name, street } = registerDTO;
    const user = new User();
    user.username = username;
    user.password = password;

    const profile = new Profile();
    profile.name = name;

    const address = new Address();
    address.street = street;

    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(user);
      await queryRunner.manager.save(profile);

      await queryRunner.commitTransaction();
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }



  login(loginDTO: LoginDTO) {
    throw new Error('Method not implemented.');
  }
}
