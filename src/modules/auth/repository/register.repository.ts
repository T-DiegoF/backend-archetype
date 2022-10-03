import { Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { RegisterDTO } from '../dto/register.dto';
import { Address } from '../entities/address.entity';
import { City } from '../entities/city.entitiy';
import { Country } from '../entities/country.entity';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class UserAuthRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
  ) {}

  async register(registerDTO: RegisterDTO) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();

    const {
      username,
      password,
      name,
      address: { street, city, country },
    } = registerDTO;

    await queryRunner.startTransaction();
    try {
      const userE = new User();
      userE.username = username;
      userE.password = password;

      const profileE = new Profile();
      profileE.name = name;
      profileE.user = userE;

      const addressE = new Address();
      addressE.street = street;

      const cityE = new City();
      cityE.name = city;

      addressE.city = cityE;

      const countryE = new Country();
      countryE.name = country;

      await queryRunner.manager.save(userE);
      await queryRunner.manager.save(addressE);
      await queryRunner.manager.save(profileE);
      await queryRunner.manager.save(cityE);

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }
}
