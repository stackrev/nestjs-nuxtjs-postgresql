import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
  HttpModule
} from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { APP_INTERCEPTOR, APP_GUARD } from "@nestjs/core";

import configuration from "./shared/configuration/configuration";
import { TransformInterceptor } from "./shared/interceptors/transform.interceptor";
import { ExcludeNullInterceptor } from "./shared/interceptors/exclude.null.interceptor";
import { SnakeCaseInterceptor } from "./shared/interceptors/snake-case.interceptor";
import { JwtStrategy } from "./modules/auth/strategies/jwt-strategy";
import { RecaptchaMiddleware } from "./shared/middlewares/recaptcha.middleware";
import { AdmModule } from "./modules/adm/adm.module";
import { RolesModule } from "./modules/roles/roles.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
      isGlobal: true,
      load: [configuration]
    }),
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5
      })
    }),
    TypeOrmModule.forRoot(),
    AuthModule,
    UsersModule,
    AdmModule,
    RolesModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ExcludeNullInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: SnakeCaseInterceptor
    },
    JwtStrategy
  ]
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    await consumer
      .apply(RecaptchaMiddleware)
      .forRoutes({ path: "/adm/lgn", method: RequestMethod.POST });
  }
}
