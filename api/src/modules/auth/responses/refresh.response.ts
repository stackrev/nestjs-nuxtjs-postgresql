import {ApiProperty} from '@nestjs/swagger';

export class RefreshResponse {
    @ApiProperty() roles?: {};
    @ApiProperty() tokens?: {};
    @ApiProperty() user?: {};
}
