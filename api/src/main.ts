import { QueryExceptionFilter } from "./shared/filters/query-exception.filter";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

// Middleware
import * as compression from "compression";
import * as helmet from "helmet";
import * as rateLimit from "express-rate-limit";
import * as morgan from "morgan";

import { Logger } from "@nestjs/common";
import { Validation } from "./shared/validations/validation";
import { UnauthorizedExceptionFilter } from "./shared/filters/unauthorized-exception.filter";
import { ForbiddenExceptionFilter } from "./shared/filters/forbidden-exception.filter";
import { InternalExceptionFilter } from "./shared/filters/internal-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
    cors: true
  });

  // *********** App Use Global Middleware ************ //

  app.use(helmet());
  app.use(
    rateLimit({
      windowMs: 60 * 1000, // 1 minutes
      max: 30, // limit each IP to 30 requests per windowMs
      message: {
        status_code: 429,
        message: "درخواست های بیش از اندازه",
        errors: []
      }
    })
  );
  app.use(compression());

  app.use(
    morgan(function(tokens, req, res) {
      Logger.debug(
        `IP:${req.connection.remoteAddress} | Method:${tokens.method(
          req,
          res
        )} | Url:${tokens.url(req, res)} | Status:${tokens.status(
          req,
          res
        )} | Time:${tokens["response-time"](req, res)}ms`,
        "MorganLogger"
      );
    })
  );

  // *********** App Global Pipes ************ //

  app.useGlobalPipes(
    new Validation({
      whitelist: true,
      transform: true
    })
  );

  // *********** App Global Filters ************ //

  app.useGlobalFilters(new InternalExceptionFilter());
  app.useGlobalFilters(new ForbiddenExceptionFilter());
  app.useGlobalFilters(new UnauthorizedExceptionFilter());
  app.useGlobalFilters(new QueryExceptionFilter());

  await app.listen(process.env.APP_PORT);
}

bootstrap();
