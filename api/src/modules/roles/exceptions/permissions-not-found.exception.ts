import { HttpException } from "@nestjs/common";

export class PermissionNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status_code: 404,
        message: "یکی از شناسه های ارسالی معتبر نمی باشد",
        errors: []
      },
      403
    );
  }
}
