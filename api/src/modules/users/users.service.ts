import {Injectable} from '@nestjs/common';
import {UserRepository} from './repositories/users.repository';
import {InjectRepository} from '@nestjs/typeorm';
import {GuestUpDto} from '../auth/dto/guest-up.dto';
import {UserDevice} from './entities/user-device.entity';
import {DeviceRepository} from './repositories/device.repository';
import {User} from './entities/users.entity';
import {CodeRequestDto} from '../auth/dto/code-request.dto';
import {DeviceNotFoundException} from '../auth/exceptions/device-notfound.exception';
import {CodeRepository} from '../auth/Repositories/code.repository';
import {Code} from '../auth/entities/code.entity';
import {CodeMinuteException} from '../auth/exceptions/code-minute.exception';

@Injectable()
export class UsersService {
    protected user: User;
    protected device: UserDevice;
    protected code: Code;

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository,
        @InjectRepository(DeviceRepository)
        private readonly deviceRepository: DeviceRepository,
        @InjectRepository(CodeRepository)
        private readonly codeRepository: CodeRepository,
    ) {
    }

    /**
     * action for guest up api
     *
     * @param dto
     */
    async findOrCreateUserAndDevice(dto: GuestUpDto): Promise<UserDevice> {
        await this.findDeviceByTypeId(dto.type_id);

        if (this.device) {
            await this.findUserById(this.device.user_id);
        } else {
            this.user = await this.userRepository.createEmptyUser();
            this.device = await this.deviceRepository.createNewDevice(
                dto,
                this.user.id
            );
        }

        return this.device;
    }

    /**
     * create and send code to user mobile
     *
     * @param dto
     * @param ip_address
     */
    async codeRequest(dto: CodeRequestDto, ip_address: string): Promise<void> {
        await this.findDeviceByTypeId(dto.type_id);
        this.handleNotFoundDevice();

        let deviceUser = await this.device.user;

        await this.findUserByMobile(dto.mobile);
        if (this.user) {
            await this.findCodeByExistUser(this.user.id);

            if (this.code) {
                if (new Date() < this.code.expired_at) throw new CodeMinuteException();
                await this.updateUserCode(ip_address);
            } else {
                await this.assignNewCodeToUser(ip_address);
            }

            if (this.user.id !== deviceUser.id) {
                await this.deviceRepository.updateDevice(this.device.id, {
                    user_id: this.user.id
                });
                /** if user device is guest, then delete this */
                if (deviceUser.mobile == undefined || deviceUser.mobile == "") {
                    await this.unlinkUser(deviceUser.id);
                }
            }
        } else {
            this.user = deviceUser;
            this.assignNewCodeToUser(ip_address);
            this.user.mobile = dto.mobile;
            await this.user.save();
        }
    }

    // Helper Methods ############ ############ ############ ############ ############ ############

    /**
     * find user by id
     *
     * @param user_id
     */
    async findUserById(user_id: any): Promise<void> {
        this.user = await this.userRepository.findOne({id: user_id});
    }

    /**
     * find device by type id
     *
     * @param type_id
     */
    async findDeviceByTypeId(type_id: string): Promise<void> {
        this.device = await this.deviceRepository.findOne({type_id});
    }

    /**
     * find user by mobile number
     *
     * @param mobile
     */
    async findUserByMobile(mobile: string): Promise<void> {
        this.user = await this.userRepository.findOne({ mobile });
    }

    /**
     * find user code by exist user entity
     *
     * @param user_id
     */
    async findCodeByExistUser(user_id: string) {
        this.code = await this.codeRepository.findOne(
            { user_id },
            { relations: ["user"] }
        );
    }

    /**
     * create user code and assign to user
     *
     * @param ip_address
     */
    async assignNewCodeToUser(ip_address: string): Promise<void> {
        this.code = await this.codeRepository.createCode(this.user, ip_address);
    }

    /**
     * update exist code entity
     *
     * @param ip_address
     */
    async updateUserCode(ip_address: string): Promise<void> {
        if (this.code) {
            this.code.code = this.codeRepository.generateDigit();
            this.code.hash = this.codeRepository.generateHash();
            this.code.expired_at = this.codeRepository.generateExpiresAt();
            this.code.ip = ip_address;
            this.code.type = "login";
            this.code.status = 0;
            await this.code.save();
        }
    }

    /**
     * delete user from database
     *
     * @param user_id
     */
    async unlinkUser(user_id) {
        await this.userRepository.deleteUser(user_id);
    }

    // Exception Handlers ############ ############ ############ ############ ############ ############

    /**
     * Notfound exception handler
     */
    handleNotFoundDevice() {
        if (!this.device) throw new DeviceNotFoundException();
    }

    // Getter Methods ############ ############ ############ ############ ############ ############

    /**
     * user getter
     */
    get userEntity(): User {
        return this.user;
    }

    /**
     * get user device entity
     */
    get deviceEntity(): UserDevice {
        return this.device;
    }

    /**
     * code getter
     */
    get codeEntity(): Code {
        return this.code;
    }
}
