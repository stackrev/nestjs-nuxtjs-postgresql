import { HttpException } from "@nestjs/common";

export class RoleFoundException extends HttpException {
  constructor() {
    super(
      {
        status_code: 404,
        message: "نقش با اطلاعات ارسالی موجود می باشد",
        errors: []
      },
      403
    );
  }
}
