import {
  Controller,
  Post,
  Body,
  Ip,
  HttpCode,
  UseGuards,
  Req
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GuestUpDto } from "./dto/guest-up.dto";
import { CodeRequestDto } from "./dto/code-request.dto";
import { CodeReqResponse } from "./responses/code-req.response";
import { TokensResponse } from "./responses/tokens.response";
import { CodeValidateDto } from "./dto/code-validate.dto";
import { CodeValidateResponse } from "./responses/code-validate.response";
import { JwtGuard } from "src/guards/auth.guard";
import { LogoutDto } from "./dto/logout.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { RefreshResponse } from "./responses/refresh.response";

@Controller("auth")
export class AuthController {
  constructor(private readonly service: AuthService) {}

  /**
   * create or update guest user and user device info
   *
   * @param ip_address
   * @param dto
   */
  @Post("guest/up")
  @HttpCode(200)
  async guestUp(
    @Ip() ip_address,
    @Body() dto: GuestUpDto
  ): Promise<TokensResponse> {
    return await this.service.guestUp(ip_address, dto);
  }

  /**
   * create or update digit code and send to user mobile
   *
   * @param ip_address
   * @param dto
   */
  @Post("code/request")
  @HttpCode(200)
  async codeRequest(
    @Ip() ip_address,
    @Body() dto: CodeRequestDto
  ): Promise<CodeReqResponse> {
    return await this.service.codeRequest(dto, ip_address);
  }

  /**
   * validate digit code
   *
   * @param ip_address
   * @param dto
   */
  @Post("code/validate")
  @HttpCode(200)
  async codeValidate(
    @Ip() ip_address,
    @Body() dto: CodeValidateDto
  ): Promise<CodeValidateResponse> {
    return await this.service.codeValidate(dto, ip_address);
  }

  /**
   * logout user
   *
   * @param req
   * @param dto
   */
  @Post("logout")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async logout(@Req() req, @Body() dto: LogoutDto) {
    await this.service.logout(dto, req.user);
  }

  /**
   * get new tokens by use refresh token
   * @param ip_address
   * @param dto
   */
  @Post("refresh")
  @HttpCode(200)
  async refresh(
    @Ip() ip_address,
    @Body() dto: RefreshDto
  ): Promise<RefreshResponse> {
    return await this.service.refresh(ip_address, dto);
  }
}
