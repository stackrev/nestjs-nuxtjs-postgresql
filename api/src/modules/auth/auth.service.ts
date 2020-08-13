import {Injectable} from '@nestjs/common';
import {TokenService} from './token.service';
import {GuestUpDto} from './dto/guest-up.dto';
import {CodeRequestDto} from './dto/code-request.dto';
import {CodeReqResponse} from './responses/code-req.response';
import {TokensResponse} from './responses/tokens.response';
import {SmsService} from 'src/shared/services/sms/sms.service';
import {CodeValidateDto} from './dto/code-validate.dto';
import {CodeValidateResponse} from './responses/code-validate.response';
import {LogoutDto} from './dto/logout.dto';
import {RefreshDto} from './dto/refresh.dto';
import {RefreshResponse} from './responses/refresh.response';
import {UsersService} from '../users/users.service';
import {User} from '../users/entities/users.entity';
import {Code} from './entities/code.entity';
import {UserDevice} from '../users/entities/user-device.entity';

@Injectable()
export class AuthService {
    protected user: User;
    protected code: Code;
    protected device: UserDevice;
    protected tokens = {};

    constructor(
        private readonly smsService: SmsService,
        private readonly tokenService: TokenService,
        private readonly userService: UsersService
    ) {
    }

    /**
     * guest up action
     *
     * @param ip_address
     * @param dto
     */
    async guestUp(ip_address: string, dto: GuestUpDto): Promise<TokensResponse> {

        this.device = await this.userService.findOrCreateUserAndDevice(dto);
        this.user = this.userService.userEntity;

        return {
            role_names: [],
            tokens: await this.tokenService.createTokens(
                ip_address,
                this.user.id,
                this.device.type_id
            )
        };
    }

    /**
     * create or update digit code and send by sms to user mobile
     *
     * @param dto
     * @param ip_address
     */
    async codeRequest(
        dto: CodeRequestDto,
        ip_address: string
    ): Promise<CodeReqResponse> {

        await this.userService.codeRequest(dto, ip_address);

        this.user = this.userService.userEntity;
        this.device = this.userService.deviceEntity;
        this.code = this.userService.codeEntity;

        // send digit code to mobile
        await this.smsService.sendOtpMessage(this.user.mobile, this.code.code);

        return {
            type_id: this.device.type_id,
            hash: this.code.hash,
            expires_at: this.code.expired_at,
            server_at: new Date()
        };
    }

    /**
     * validate digit code and assign needed role to user
     *
     * @param dto
     * @param ip_address
     */
    async codeValidate(dto: CodeValidateDto, ip_address: string): Promise<CodeValidateResponse> {

        return {
            tokens: await this.tokenService.createTokens(
                ip_address,
                this.user.id,
                'sample type id'
            ),
            user: {}
        };
    }

    /**
     * assign logout date to user accounts, delete user refresh tokens
     *
     * @param dto
     * @param user
     */
    async logout(dto: LogoutDto, user: any): Promise<any> {
        // store logout time here
        await this.tokenService.deleteRefreshToken(user.id);
    }

    /**
     * create new tokens from refresh token
     *
     * @param ip
     * @param dto
     */
    async refresh(ip, dto: RefreshDto): Promise<RefreshResponse> {
        const tokens = await this.tokenService.getAccessTokenFromRefreshToken(
            dto.refresh_token,
            dto.old_access_token,
            dto.type_id,
            ip
        );

        return {
            roles: {},
            tokens: {},
            user: {}
        };
    }
}
