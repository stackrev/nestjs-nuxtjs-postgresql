import {ApiProperty} from '@nestjs/swagger';

export class CodeReqResponse {
    @ApiProperty() type_id: string;
    @ApiProperty() hash: string;
    @ApiProperty() expires_at: Date;
    @ApiProperty() server_at: Date;
}
