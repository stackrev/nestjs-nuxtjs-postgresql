import {Repository, EntityRepository, ObjectID} from 'typeorm';
import {UserDevice} from '../entities/user-device.entity';

@EntityRepository(UserDevice)
export class DeviceRepository extends Repository<UserDevice> {
  async createNewDevice(dto: any, user_id: string): Promise<UserDevice> {
    let device = new UserDevice();
    device.user_id = user_id;
    device.type = dto.type;
    device.type_version = dto.type_version;
    device.type_id = dto.type_id;
    device.brand_name = dto.brand_name;
    device.app_version = dto.app_version;
    device.device_model = dto.device_model;
    device.firebase_token = dto.firebase_token;
    await device.save();
    return device;
  }

  async updateDevice(id, data) {
    await this.createQueryBuilder()
      .update(UserDevice)
      .set(data)
      .where("user_devices.id=:id", { id })
      .execute();
  }
}
