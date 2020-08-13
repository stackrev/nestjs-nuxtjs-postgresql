import { AuthGuard } from "@nestjs/passport";
import { AdminLoginResponse } from "./responses/admin-login.response";
import { AdminUserResponse } from "./responses/admin-user.response";
import { AdminLoginDto } from "./dto/admin-login.dto";
import { Ip } from "./../../shared/decorators/ip.decorator";
import { AdmService } from "./adm.service";
import {
  Controller,
  Post,
  HttpCode,
  Body,
  UseGuards,
  Request,
  Get
} from "@nestjs/common";
import { JwtGuard } from "src/guards/auth.guard";

@Controller("adm")
export class AdmController {
  constructor(private readonly service: AdmService) {}

  @Post("lgn")
  @HttpCode(200)
  @UseGuards(AuthGuard("local"))
  async adminLogin(
    @Request() req,
    @Body() dto: AdminLoginDto,
    @Ip() ip
  ): Promise<AdminLoginResponse> {
    return await this.service.login(req.user, dto, ip);
  }

  @Get("usr")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async user(@Request() req): Promise<AdminUserResponse> {
    return await this.service.userAction(req.user);
  }

  @Get("lgt")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async logout(@Request() req) {
    await this.service.logout(req.user);
  }
}
