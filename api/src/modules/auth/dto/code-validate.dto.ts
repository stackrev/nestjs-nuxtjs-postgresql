import {
    IsNotEmpty,
    MinLength,
    MaxLength,
    IsString,
    Length
} from 'class-validator';

export class CodeValidateDto {
    @MinLength(10, {message: 'نمی تواند کمتر از ۱۰ کارکتر باشد'})
    @MaxLength(191, {message: 'نمی تواند بیشتر از ۱۹۱ کارکتر باشد'})
    @IsString({message: 'باید بصورت یک رشته از کارکترها باشد'})
    @IsNotEmpty({message: 'می بایست مقداردهی شود'})
    hash: string;

    @Length(4, 4, {message: 'می بایست ۴ کارکتر باشد'})
    @IsNotEmpty({message: 'می بایست مقداردهی شود'})
    code: string;

    @MinLength(2, {message: 'نمی تواند کمتر از ۳ کارکتر باشد'})
    @MaxLength(191, {message: 'نمی تواند بیشتر از ۱۹۱ کارکتر باشد'})
    @IsString({message: 'باید بصورت یک رشته از کارکترها باشد'})
    @IsNotEmpty({message: 'می بایست مقداردهی شود'})
    type_id: string;
}
