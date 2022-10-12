import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import appConfiguration from '../app/app.configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfiguration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'mysql',
        host: config.get('database.host'),
        port: +config.get('database.port'),
        username: config.get('database.username'),
        password: config.get('database.password'),
        database: config.get('database.databaseName'),
        autoLoadEntities: true,
        synchronize: false, //false because we load the database with the script that is inside .sql and is used by docker-compose in the entrypoint
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) {}
}
