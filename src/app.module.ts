import { Module } from '@nestjs/common';
import { DatabaseModule } from './configs/db/database.module';


@Module({
  imports: [DatabaseModule],
})
export class AppModule { }

