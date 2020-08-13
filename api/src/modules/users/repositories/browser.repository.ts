import { Repository, EntityRepository } from "typeorm";
import { UserBrowsers } from "../entities/user-browser.entity";

const uuid = require("uuid/v4");

@EntityRepository(UserBrowsers)
export class BrowserRepository extends Repository<UserBrowsers> {
  async findByUserId(user_id: string): Promise<UserBrowsers> {
    return await this.findOne({ where: { user_id } });
  }

  async createNew(data: any): Promise<UserBrowsers> {
    const browser = this.create({
      user_id: data.user_id,
      type_id: uuid(),
      ip: data.ip,
      device_type: data.device_type,
      os: data.os,
      os_version: data.os_version,
      browser: data.browser,
      browser_vendor: data.browser_vendor,
      browser_version: data.browser_version
    });
    return await this.save(browser);
  }
}
