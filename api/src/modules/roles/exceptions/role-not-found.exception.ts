import { HttpException } from "@nestjs/common";

export class RoleNotFoundException extends HttpException {
  constructor() {
    super(
      {
        status_code: 404,
        message: "نقش مورد نظر یافت نشد",
        errors: []
      },
      403
    );
  }
}
