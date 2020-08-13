import { Repository, EntityRepository } from "typeorm";
import moment = require("moment");
import {Code} from '../entities/code.entity';
const crypto = require("crypto");

@EntityRepository(Code)
export class CodeRepository extends Repository<Code> {
  async createCode(user, ip_address: string): Promise<Code> {
    const code = new Code();
    code.user = Promise.resolve(user);
    code.code = this.generateDigit();
    code.hash = this.generateHash();
    code.ip = ip_address;
    code.type = "register";
    code.status = 0;
    code.expired_at = this.generateExpiresAt();
    await code.save();
    return code;
  }

  generateDigit() {
    return Math.floor(1000 + Math.random() * 9000) + "";
  }

  generateHash() {
    return crypto.randomBytes(20).toString("hex");
  }

  generateExpiresAt() {
    return moment()
      .add(2, "minutes")
      .toDate();
  }
}
