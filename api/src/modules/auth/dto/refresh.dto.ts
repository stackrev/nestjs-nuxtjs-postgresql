import { IsNotEmpty, MinLength, MaxLength, IsString } from "class-validator";

export class RefreshDto {
  @MinLength(120, { message: "نمی تواند کمتر از ۱۲۰ کارکتر باشد" })
  @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  refresh_token: string;

  @MinLength(120, { message: "نمی تواند کمتر از ۱۲۰ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  old_access_token: string;

  @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
  @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  type_id: string;
}
