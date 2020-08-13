import {HttpException} from '@nestjs/common';

export class CodeUsedException extends HttpException {
    constructor() {
        super(
            {
                status_code: 422,
                message: 'کد تایید قبلا استفاده شده است',
                errors: [
                    {
                        field: 'code',
                        messages: ['کد تایید قبلا استفاده شده است']
                    }
                ]
            },
            422
        );
    }
}
