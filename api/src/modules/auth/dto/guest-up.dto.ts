import {
    IsString,
    MaxLength,
    MinLength,
    IsNotEmpty,
    IsEnum
} from "class-validator";
import {DeviceType} from '../../users/enums/device-type.enum';

export class GuestUpDto {
    @IsEnum(DeviceType, { message: "معتبر نمی باشد" })
    @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
    @MaxLength(20, { message: "نمی تواند بیشتر از ۲۰ کارکتر باشد" })
    @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
    @IsNotEmpty({ message: "می بایست مقداردهی شود" })
    type: string;

    @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
    @MaxLength(25, { message: "نمی تواند بیشتر از ۲۵ کارکتر باشد" })
    @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
    @IsNotEmpty({ message: "می بایست مقداردهی شود" })
    type_version: string;

    @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
    @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
    @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
    @IsNotEmpty({ message: "می بایست مقداردهی شود" })
    type_id: string;

    @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
    @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
    @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
    @IsNotEmpty({ message: "می بایست مقداردهی شود" })
    brand_name: string;

    @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
    @MaxLength(191, { message: "نمی تواند بیشتر از ۱۹۱ کارکتر باشد" })
    @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
    device_model: string;

    @MinLength(2, { message: "نمی تواند کمتر از ۳ کارکتر باشد" })
    @MaxLength(100, { message: "نمی تواند بیشتر از ۱۰۰ کارکتر باشد" })
    @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
    @IsNotEmpty({ message: "می بایست مقداردهی شود" })
    app_version: string;

    @MinLength(40, { message: "نمی تواند کمتر از ۴۰ کارکتر باشد" })
    @IsString({ message: "باید بصورت یک رشته از کارکترها باشد" })
    firebase_token: string;
}
