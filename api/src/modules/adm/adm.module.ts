import { BrowserRepository } from "./../users/repositories/browser.repository";
import { RoleRepository } from "../roles/repositories/role.repository";
import { LocalStrategy } from "./strategies/local.strategy";
import { TokenService } from "./../auth/token.service";
import { JwtStrategy } from "./../auth/strategies/jwt-strategy";
import { UserRepository } from "./../users/repositories/users.repository";
import { RefreshTokenRepository } from "./../auth/Repositories/refresh.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PassportModule } from "@nestjs/passport";
import { Module, HttpModule } from "@nestjs/common";
import { AdmService } from "./adm.service";
import { AdmController } from "./adm.controller";

@Module({
  providers: [AdmService, JwtStrategy, LocalStrategy, TokenService],
  controllers: [AdmController],
  imports: [
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5
      })
    }),
    PassportModule,
    TypeOrmModule.forFeature([
      RefreshTokenRepository,
      UserRepository,
      BrowserRepository,
      RoleRepository
    ])
  ]
})
export class AdmModule {}
