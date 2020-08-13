import {HttpException} from '@nestjs/common';

export class InvalidRefreshException extends HttpException {
    constructor() {
        super(
            {
                status_code: 403,
                message: 'توکن نامعتبر است. لطفا پروسه دریافت کد موقت را دنبال کنید',
                errors: []
            },
            403
        );
    }
}
