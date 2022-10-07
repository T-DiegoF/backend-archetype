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
      useFactory: async (config: ConfigService) => ({
        type: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        synchronize: false, //false because we load the database with the script that is inside .sql and is used by docker-compose in the entrypoint
      }),
    }),
  ],
})
export class DatabaseModule {
  constructor(private dataSource: DataSource) { }
}
