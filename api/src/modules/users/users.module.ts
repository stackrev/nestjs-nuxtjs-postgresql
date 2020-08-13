import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from './repositories/users.repository';
import {ConfigModule} from '@nestjs/config';
import {DeviceRepository} from './repositories/device.repository';
import {CodeRepository} from '../auth/Repositories/code.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserRepository,
            DeviceRepository,
            CodeRepository,
        ]),
        ConfigModule
    ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [UsersService],
})
export class UsersModule {
}
