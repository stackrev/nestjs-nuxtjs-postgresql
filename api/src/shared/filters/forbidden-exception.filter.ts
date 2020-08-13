import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  ForbiddenException
} from "@nestjs/common";
import { Response } from "express";

@Catch(ForbiddenException)
export class ForbiddenExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.getStatus();
    response.status(status).json({
      status_code: 403,
      success: false,
      message: "شما دسترسی کافی ندارید!",
      errors: []
    });
  }
}
