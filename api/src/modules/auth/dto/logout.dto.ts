import { IsNotEmpty, MinLength, MaxLength, IsString } from "class-validator";

export class LogoutDto {
  @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
  @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  type_id: string;
}
