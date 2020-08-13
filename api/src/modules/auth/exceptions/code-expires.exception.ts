import {HttpException} from '@nestjs/common';

export class CodeExpiresException extends HttpException {
    constructor() {
        super(
            {
                status_code: 422,
                message: 'کد تایید منقضی شده است',
                errors: [
                    {
                        field: 'code',
                        messages: ['کد تایید منقضی شده است']
                    }
                ]
            },
            422
        );
    }
}
