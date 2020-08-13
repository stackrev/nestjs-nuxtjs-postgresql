import { HttpException } from "@nestjs/common";

export class AdminNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status_code: 422,
        message: "اطلاعات ورودی معتبر نمی باشد",
        errors: []
      },
      422
    );
  }
}
