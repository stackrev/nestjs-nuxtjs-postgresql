import { HttpException } from "@nestjs/common";

export class AdminInactiveException extends HttpException {
  constructor() {
    super(
      {
        status_code: 403,
        message:
          "شخص شما در سیستم با دلایلی مشخص غیرفعال می باشید. لطفا با کارشناس مربوطه تماس بگیرید",
        errors: []
      },
      403
    );
  }
}
