import {HttpException} from '@nestjs/common';

export class UnAuthenticationException extends HttpException {
    constructor() {
        super(
            {
                status_code: 401,
                success: false,
                message: 'شما وارد سیستم نشده اید',
                errors: []
            },
            401
        );
    }
}
