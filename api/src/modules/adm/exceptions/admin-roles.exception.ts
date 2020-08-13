import { HttpException } from "@nestjs/common";

export class AdminRolesException extends HttpException {
  constructor() {
    super(
      {
        status_code: 403,
        message:
          "شما اجازه دسترسی به پنل مدیریت را ندارید. لطفا با کارشناس مربوطه تماس بگیرید",
        errors: []
      },
      403
    );
  }
}
