import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigService } from '../app/config.service';
import { ConfigurationDB } from '../app/config';
import { ConfigModule } from '../app/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: config.get(ConfigurationDB.DB_HOST),
        port: 3306,
        username: 'root',
        password: 'example',
        database: 'test',
        autoLoadEntities: true,
        synchronize: true,
        dropSchema: false,
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
