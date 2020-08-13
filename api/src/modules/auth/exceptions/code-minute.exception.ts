import {HttpException} from '@nestjs/common';

export class CodeMinuteException extends HttpException {
    constructor() {
        super(
            {
                status_code: 422,
                message: 'برای دریافت کد جدید دو دقیقه منتظر بمانید',
                errors: [
                    {
                        field: 'mobile',
                        messages: ['برای دریافت کد جدید دو دقیقه منتظر بمانید']
                    }
                ]
            },
            422
        );
    }
}
