import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './api/auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
  ],
})
export class AppModule {}