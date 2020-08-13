import { HttpException } from "@nestjs/common";

export class RecaptchaException extends HttpException {
  constructor() {
    super(
      {
        status_code: 422,
        success: false,
        message: "اطلاعات ورودی شما معتبر نمی باشد",
        errors: []
      },
      422
    );
  }
}
