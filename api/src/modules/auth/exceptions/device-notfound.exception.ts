import {HttpException} from '@nestjs/common';

export class DeviceNotFoundException extends HttpException {
    constructor() {
        super(
            {
                status_code: 422,
                message: 'اطلاعات دستگاه یافت نشد',
                errors: [
                    {
                        field: 'type_id',
                        messages: ['اطلاعات دستگاه یافت نشد']
                    }
                ]
            },
            422
        );
    }
}
