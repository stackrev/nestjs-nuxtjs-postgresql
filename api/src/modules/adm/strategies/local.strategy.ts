import { AdminInactiveException } from "./../exceptions/admin-inactive.exception";
import { AdminNotFoundException } from "./../exceptions/admin-not-found.exception";
import { UserRepository } from "./../../users/repositories/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";

const bcrypt = require("bcrypt");

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  private user: any;

  constructor(
    @InjectRepository(UserRepository) private readonly userRepo: UserRepository
  ) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    await this.findUserAndCheckPassword(username, password);
    return this.user;
  }

  async findUserAndCheckPassword(username: string, password: string) {
    this.user = await this.userRepo.findByUsername(username);
    // check user exist
    if (!this.user) {
      throw new AdminNotFoundException();
    }
    // check user password
    bcrypt.compare(password, this.user.password).then(function(result) {
      if (!result) {
        throw new AdminNotFoundException();
      }
    });
    // check user status
    if (this.user.status === 0) {
      throw new AdminInactiveException();
    }
  }

  async checkUserStatusAndRole() {}
}
