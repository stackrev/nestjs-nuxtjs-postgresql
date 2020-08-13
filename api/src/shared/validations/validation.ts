import {
  ValidationPipe,
  ArgumentMetadata,
  BadRequestException,
  UnprocessableEntityException
} from "@nestjs/common";

export class Validation extends ValidationPipe {
  public async transform(value, metadata: ArgumentMetadata) {
    try {
      return await super.transform(value, metadata);
    } catch (e) {
      if (e instanceof BadRequestException) {
        let res = {
          status_code: 422,
          message: "داده های ارسالی معتبر نمی باشد",
          errors: []
        };
        e.message.message.forEach(element => {
          res.errors.push({
            field: element.property,
            message: Object.values(element.constraints)[0]
          });
        });
        throw new UnprocessableEntityException(res);
      }
    }
  }
}
