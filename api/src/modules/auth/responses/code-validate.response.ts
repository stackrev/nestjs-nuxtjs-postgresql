import {ApiProperty} from '@nestjs/swagger';

export class CodeValidateResponse {
    @ApiProperty() tokens?: {};
    @ApiProperty() user?: {};
}
