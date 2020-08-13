import { HttpException } from "@nestjs/common";

export class RoleDeleteAbleException extends HttpException {
  constructor() {
    super(
      {
        status_code: 406,
        message: "نقش مورد نظر قابل حذف نمی باشد",
        errors: []
      },
      406
    );
  }
}
