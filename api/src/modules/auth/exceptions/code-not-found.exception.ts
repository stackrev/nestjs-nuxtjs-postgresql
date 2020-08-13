import { HttpException } from "@nestjs/common";

export class CodeNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status_code: 422,
        message: "کد تایید معتبر نمی باشد",
        errors: [
          {
            field: "code",
            messages: ["کد تایید معتبر نمی باشد"]
          }
        ]
      },
      422
    );
  }
}
