import { IsString, MaxLength, MinLength, IsNotEmpty } from "class-validator";

export class AdminLoginDto {
  @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
  @MaxLength(25, { message: "نمی تواند بیشتر از ۲۵ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  username: string;

  @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
  @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  password: string;

  @MaxLength(191, { message: "" })
  device_type: string;

  @MaxLength(191, { message: "" })
  os: string;

  @MaxLength(191, { message: "" })
  os_version: string;

  @MaxLength(191, { message: "" })
  browser: string;

  @MaxLength(191, { message: "" })
  browser_vendor: string;

  @MaxLength(191, { message: "" })
  browser_version: string;
}
