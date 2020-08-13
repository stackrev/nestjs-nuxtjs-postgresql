import {HttpException} from '@nestjs/common';

export class UnActiveUserException extends HttpException {
    constructor() {
        super(
            {
                status_code: 403,
                success: false,
                message: 'حساب کاربری شما غیرفعال است',
                errors: []
            },
            406
        );
    }
}
