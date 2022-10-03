import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: 'db',
        port: 3306,
        username: 'root',
        password: 'example',
        database: 'test',
        autoLoadEntities: true,
        synchronize: false,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
