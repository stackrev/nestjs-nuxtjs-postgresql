import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  InternalServerErrorException
} from "@nestjs/common";
import { Response } from "express";

@Catch(InternalServerErrorException)
export class InternalExceptionFilter implements ExceptionFilter {
  catch(exception: UnauthorizedException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status = exception.getStatus();
    response.status(status).json({
      status_code: 500,
      success: false,
      message: "اووپس! درخواست با خطا مواجه شده است.",
      errors: []
    });
  }
}
