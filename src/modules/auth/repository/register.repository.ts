import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RegisterDTO } from '../dto/register.dto';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserAuthRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) { }

  async register(registerDTO: RegisterDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const { username, password, name } = registerDTO;


    const user = new User();
    user.username = username;
    user.password = password;

    const profile = new Profile();
    profile.name = name;
    console.log("LOOGS", profile)
    console.log("LOOGS", user)




    await queryRunner.startTransaction();
    try {
      await queryRunner.manager.save(profile);
      await queryRunner.manager.save(user);



      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
