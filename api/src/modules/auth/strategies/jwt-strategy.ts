import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy, VerifiedCallback } from "passport-jwt";
import { JwtPayload } from "../jwt-payload";
import { TokenService } from "../token.service";
import { UnAuthenticationException } from "../../../exceptions/un-authentication.exception";
import { UnActiveUserException } from "../../../exceptions/in-active-user.exception";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        ExtractJwt.fromUrlQueryParameter("access_token")
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("jwt.token")
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const result = await this.tokenService.validatePayload(payload);
    if (!result) {
      throw new UnAuthenticationException();
    }

    const user = await this.tokenService.findUserById(result.id);
    if (!user) {
      throw new UnAuthenticationException();
    }
    if (user.status === 0) {
      throw new UnActiveUserException();
    }

    return done(null, user, payload.iat);
  }
}
