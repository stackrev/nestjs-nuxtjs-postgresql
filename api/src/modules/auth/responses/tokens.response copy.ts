import {ApiProperty} from '@nestjs/swagger';

export class TokensResponse {
    @ApiProperty() role_names?: {};
    @ApiProperty() tokens?: {};
}
