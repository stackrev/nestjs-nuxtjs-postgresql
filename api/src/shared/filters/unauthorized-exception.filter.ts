import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException
} from "@nestjs/common";
import { Response } from "express";

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.getStatus();
    response.status(status).json({
      status_code: 401,
      success: false,
      message: "شما وارد سیستم نشده اید",
      errors: []
    });
  }
}
