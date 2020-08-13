import { RolePermissionDto } from "./dto/role-permission.dto";
import { RoleShowResponse } from "./responses/role-show.response";
import { RoleUpdateDto } from "./dto/role-update.dto";
import { RoleResponse } from "./responses/role.response";
import { RoleStoreDto } from "./dto/role-store.dto";
import { JwtGuard } from "./../../guards/auth.guard";
import { RolesService } from "./roles.service";
import { Permission } from "src/shared/decorators/permission.decorator";
import {
  Controller,
  Get,
  Query,
  UseGuards,
  HttpCode,
  Post,
  Body,
  Patch,
  Param,
  Delete
} from "@nestjs/common";

@Controller("roles")
export class RolesController {
  constructor(private readonly service: RolesService) {}

  @Get()
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async index(
    @Permission("role_list") perm,
    @Query("page") page: number = 0,
    @Query("limit") limit: number = 10,
    @Query("search") search: string = ""
  ) {
    limit = limit > 100 ? 100 : limit;
    return await this.service.paginate(
      {
        page,
        limit,
        route: "/roles"
      },
      search
    );
  }

  @Post()
  @HttpCode(201)
  @UseGuards(JwtGuard)
  async store(
    @Permission("role_store") perm,
    @Body() dto: RoleStoreDto
  ): Promise<RoleResponse> {
    return await this.service.store(dto);
  }

  @Patch("/:id")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async update(
    @Permission("role_update") perm,
    @Param() params,
    @Body() dto: RoleUpdateDto
  ): Promise<RoleResponse> {
    return await this.service.update(params, dto);
  }

  @Delete("/:id")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async delete(@Permission("role_delete") perm, @Param() params) {
    await this.service.delete(params);
  }

  @Get("/:id/show")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async showRole(
    @Permission("role_show") perm,
    @Param() params
  ): Promise<RoleShowResponse> {
    return await this.service.show(params);
  }

  @Post("/:id/permissions")
  @HttpCode(200)
  @UseGuards(JwtGuard)
  async permissions(
    @Permission("role_permission_sync") perm,
    @Param() params,
    @Body() dto: RolePermissionDto
  ) {
    await this.service.permissions(params, dto);
  }
}
