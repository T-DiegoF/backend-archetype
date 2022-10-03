import { Module } from '@nestjs/common';
import { DatabaseModule } from './configs/db/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user-module';

@Module({
  imports: [DatabaseModule, AuthModule, UserModule],
})
export class AppModule {}
