import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectDataSource } from '@nestjs/typeorm';
import { compare, genSalt, hash } from 'bcryptjs';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { UserRepository } from '../../../modules/user/user-repository';
import { DataSource } from 'typeorm';
import { Logger } from 'winston';
import { LoginDTO } from '../dto/login.dto';
import { RegisterDTO } from '../dto/register.dto';
import { Address } from '../entities/address.entity';
import { Profile } from '../entities/profile.entity';
import { User } from '../entities/user.entity';
import { IJwtPayload } from '../strategies/jwt-payload.interface';

@Injectable()
export class AuthRepository {
  constructor(
    @InjectDataSource()
    private dataSource: DataSource,
    private userRepository: UserRepository,
    private readonly jwtService: JwtService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) {}

  async register(registerDTO: RegisterDTO): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    this.logger.info('starting transaction', { provider: AuthRepository.name });
    await queryRunner.startTransaction();

    try {
      const {
        username,
        password,
        name,
        address: { street, cityId },
      } = registerDTO;

      const user: User = await this.userRepository.findUsername(username);

      if (user) {
        throw new NotFoundException('username not available');
      }

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
      this.logger.info('commit transaction, user saved', {
        repository: AuthRepository.name,
      });
    } catch (err) {
      this.logger.error(
        'Error, rollback Transaction:',
        err.message,
        AuthRepository.name,
      );
      await queryRunner.rollbackTransaction();
      throw new Error(err.stack);
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDTO: LoginDTO): Promise<{ token: string }> {
    try {
      const { username, password } = loginDTO;

      const user: User = await this.userRepository.findUsername(username);

      if (!user) {
        throw new UnauthorizedException('user not found');
      }

      const isMatch = await compare(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('incorrect username or password');
      }

      const payload: IJwtPayload = {
        id: user.id,
        username: user.username,
      };

      const token = await this.jwtService.sign(payload);
      this.logger.info('user found, login successful', {
        repository: AuthRepository.name,
      });
      return { token };
    } catch (err) {
      this.logger.error(
        'Error, method login:',
        err.message,
        AuthRepository.name,
      );
      throw new Error(err.stack);
    }
  }
}
