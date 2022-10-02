import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { User } from 'src/modules/auth/entities/user.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'example',
        database: 'test',
        entities: [User],
        synchronize: true,
        dropSchema: true,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
