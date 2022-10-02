import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common'
import { User } from 'src/modules/auth/entities/user.entity';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                type: 'mysql',
                host: configService.get('DB_HOST'),
                port: configService.get('DB_PORT'),
                username: configService.get('DB_USER'),
                password: configService.get('DB_PASSWORD'),
                database: configService.get('DB_NAME'),
                entities: [User],
                synchronize: true,
                dropSchema: true
            }),
            inject: [ConfigService]
        }),
    ],
    controllers: [],
    providers: [],
})
export class DataBaseProvider { }