import { ApiProperty } from "@nestjs/swagger";

export class RoleShowResponse {
  @ApiProperty() role: {};
  @ApiProperty() rolePermissions: any;
  @ApiProperty() permissions: any;
}
