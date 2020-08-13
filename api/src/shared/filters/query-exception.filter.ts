import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException
} from "@nestjs/common";
import { Response } from "express";
import { QueryFailedError } from "typeorm";

@Catch(QueryFailedError)
export class QueryExceptionFilter implements ExceptionFilter {
  catch(exception: QueryFailedError, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    response.status(500).json({
      status_code: 500,
      success: false,
      message: "اووپس! درخواست با خطا مواجه شده است.",
      errors: []
    });
  }
}
