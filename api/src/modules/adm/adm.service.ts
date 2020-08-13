import { BrowserRepository } from "./../users/repositories/browser.repository";
import { RoleRepository } from "../roles/repositories/role.repository";
import { AdminRolesException } from "./exceptions/admin-roles.exception";
import { PanelRolesEnum } from "./enums/panel-roles.enum";
import { AdminLoginResponse } from "./responses/admin-login.response";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { UserRepository } from "./../users/repositories/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenService } from "./../auth/token.service";
import { Injectable } from "@nestjs/common";
import { AdminUserResponse } from "./responses/admin-user.response";

@Injectable()
export class AdmService {
  private user: any;
  private browser: any;
  private roles: any;
  private tokens: [];

  constructor(
    private readonly tokenService: TokenService,

    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(BrowserRepository)
    private readonly browserRepository: BrowserRepository,

    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository
  ) {}

  // action method /////////////////////// /////////////////////// ///////////////////////

  async login(
    user: any,
    dto: AdminLoginDto,
    ip: string
  ): Promise<AdminLoginResponse> {
    this.user = user;

    await this.checkIp(ip);
    await this.checkUserRoles();
    await this.createOrUpdateBrowserData(dto, ip);
    await this.updateUserLoginAt();

    let tokens = await this.tokenService.createTokens(
      ip,
      this.user.id,
      this.browser.type_id
    );

    return { tokens };
  }

  async userAction(user: any): Promise<AdminUserResponse> {
    this.user = user;
    this.roles = await this.user.roles;

    let roleNames = this.UserRoleNames;

    return {
      user: {
        id: this.user.id,
        photo_id: this.user.photo_id,
        mobile: this.user.mobile,
        username: this.user.username,
        email: this.user.email,
        name: this.user.name,
        family: this.user.family,
        login_at: this.user.login_at,
        permissions: await this.roleRepository.permissionNames(roleNames),
        role_names: roleNames
      }
    };
  }

  async logout(user: any) {
    this.user = user;
    await this.tokenService.deleteRefreshTokenForUser(this.user.id);
    await this.userRepository.update(
      { id: this.user.id },
      { logout_at: new Date() }
    );
  }

  // helper methods /////////////////////// /////////////////////// ///////////////////////

  async checkIp(ip: string) {
    // @TODO: check company ip here
  }

  async checkUserRoles() {
    let flag = false;
    this.roles = await this.user.roles;
    this.roles.forEach(role => {
      if (
        role.name === PanelRolesEnum.ADMIN ||
        role.name === PanelRolesEnum.OPERATOR
      ) {
        flag = true;
      }
    });
    if (!flag) {
      throw new AdminRolesException();
    }
  }

  async createOrUpdateBrowserData(dto: AdminLoginDto, ip: string) {
    this.browser = await this.browserRepository.findByUserId(this.user.id);

    let data = {
      user_id: this.user.id,
      device_type: dto.device_type,
      ip,
      os: dto.os,
      os_version: dto.os_version,
      browser: dto.browser,
      browser_vendor: dto.browser_vendor,
      browser_version: dto.browser_version
    };

    if (this.browser) {
      await this.browserRepository.update({ id: this.browser.id }, data);
    } else {
      this.browser = await this.browserRepository.createNew(data);
    }
  }

  async updateUserLoginAt() {
    await this.userRepository.update(
      { id: this.user.id },
      { login_at: new Date() }
    );
  }

  // getter methods /////////////////////// /////////////////////// ///////////////////////

  get UserRoleNames() {
    return this.roles.map(function(role) {
      return role["name"];
    });
  }
}
