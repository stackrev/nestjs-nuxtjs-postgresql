import { IsNotEmpty, MinLength, ArrayUnique } from "class-validator";

export class RolePermissionDto {
  @ArrayUnique({ message: "اطلاعات ارسالی یونیک نیست" })
  @MinLength(1, {
    each: true,
    message: "حداقل یک مجوز می بایست انتخاب شد"
  })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  ids: string[];
}
