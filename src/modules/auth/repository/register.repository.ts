import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { profile } from 'console';
import { DataSource } from 'typeorm';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { Address } from '../entities/address.entity';
import { City } from '../entities/city.entitiy';
import { Country } from '../entities/country.entity';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { IJwtPayload } from '../strategies/jwt-payload.interface';

@Injectable()
export class UserAuthRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const {
        username,
        password,
        name,
        address: { street, cityId },
      } = registerDTO;

      const salt = await genSalt(10);
      const userE = new User();
      userE.username = username;
      userE.password = await hash(password, salt);

      const profileE = new Profile();
      profileE.name = name;
      profileE.user = userE;

      const addressE = new Address();
      addressE.street = street;
      addressE.city = cityId;

      profileE.address = addressE;
      await queryRunner.manager.save(userE);
      await queryRunner.manager.save(addressE);
      await queryRunner.manager.save(profileE);
      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new Error(err);
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDTO: LoginDTO) {}
}
