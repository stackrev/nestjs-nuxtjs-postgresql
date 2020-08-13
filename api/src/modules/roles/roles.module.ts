import { PermissionRepository } from "./repositories/permission.repository";
import { RoleRepository } from "./repositories/role.repository";
import { UserRepository } from "./../users/repositories/users.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { RolesService } from "./roles.service";
import { RolesController } from "./roles.controller";

@Module({
  providers: [RolesService],
  controllers: [RolesController],
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      PermissionRepository
    ])
  ]
})
export class RolesModule {}
