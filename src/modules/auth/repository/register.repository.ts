/* import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'mysql2';
import { DataSource, EntityManager, Repository } from 'typeorm';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { Address } from '../entities/address.entity';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { IUserAuthRepository } from './register-repository.interface';

@Injectable()
export class UserAuthRepository extends Repository<User> implements IUserAuthRepository {


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



 */