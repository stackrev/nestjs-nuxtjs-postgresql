import {Module, HttpModule} from '@nestjs/common';
import {AuthController} from './auth.controller';
import {AuthService} from './auth.service';
import {PassportModule} from '@nestjs/passport';
import {JwtStrategy} from './strategies/jwt-strategy';
import {TokenService} from './token.service';
import {UsersService} from 'src/modules/users/users.service';
import {SmsService} from 'src/shared/services/sms/sms.service';
import {ConfigModule} from '@nestjs/config';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UserRepository} from '../users/repositories/users.repository';
import {CodeRepository} from './Repositories/code.repository';
import {RefreshTokenRepository} from './Repositories/refresh.repository';
import {DeviceRepository} from '../users/repositories/device.repository';

@Module({
    imports: [
        ConfigModule,
        HttpModule.registerAsync({
            useFactory: () => ({
                timeout: 5000,
                maxRedirects: 5
            })
        }),
        PassportModule,
        TypeOrmModule.forFeature([
            CodeRepository,
            RefreshTokenRepository,
            UserRepository,
            DeviceRepository,
        ]),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy, SmsService, TokenService, UsersService],
    exports: [AuthService, TokenService]
})
export class AuthModule {
}
