import {
    IsNotEmpty,
    Matches,
    MinLength,
    MaxLength,
    IsString
} from 'class-validator';

export class CodeRequestDto {
    @Matches(/^(09){1}[0-9]{9}$/, {
        message: 'شماره همراه معتبر نمی باشد'
    })
    @IsNotEmpty({message: 'می بایست مقداردهی شود'})
    mobile: string;

    @MinLength(2, {message: 'نمی تواند کمتر از ۳ کارکتر باشد'})
    @MaxLength(191, {message: 'نمی تواند بیشتر از ۱۹۱ کارکتر باشد'})
    @IsString({message: 'باید بصورت یک رشته از کارکترها باشد'})
    @IsNotEmpty({message: 'می بایست مقداردهی شود'})
    type_id: string;
}
