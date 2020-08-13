import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsString,
  IsNumberString,
  IsNumber
} from "class-validator";

export class RoleUpdateDto {
  @MinLength(3, { message: "نمی تواند کمتر از ۴ کارکتر باشد" })
  @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  name: string;

  @MinLength(3, { message: "نمی تواند کمتر از ۴ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  title: string;

  @IsNumber({}, { message: "باید بصورت یک عدد باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  priority: string;

  @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
  @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
  @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
  @IsNotEmpty({ message: "می بایست مقداردهی شود" })
  description: string;
}
