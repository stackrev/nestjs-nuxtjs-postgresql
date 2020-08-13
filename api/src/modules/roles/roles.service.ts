import { PermissionNotFoundException } from "./exceptions/permissions-not-found.exception";
import { RolePermissionDto } from "./dto/role-permission.dto";
import { RoleShowResponse } from "./responses/role-show.response";
import { RoleDeleteAbleException } from "./exceptions/role-delete-able.exception";
import { RoleUpdateDto } from "./dto/role-update.dto";
import { RoleNotFoundException } from "./exceptions/role-not-found.exception";
import { RoleFoundException } from "./exceptions/role-found.exception";
import { RoleResponse } from "./responses/role.response";
import { RoleStoreDto } from "./dto/role-store.dto";
import { Role } from "./entities/role.entity";
import { PermissionRepository } from "./repositories/permission.repository";
import { RoleRepository } from "./repositories/role.repository";
import { UserRepository } from "./../users/repositories/users.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import {
  paginate,
  Pagination,
  IPaginationOptions
} from "nestjs-typeorm-paginate";
import { In } from "typeorm";

@Injectable()
export class RolesService {
  private role: Role;

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,

    @InjectRepository(RoleRepository)
    private readonly roleRepository: RoleRepository,

    @InjectRepository(PermissionRepository)
    private readonly permissionRepository: PermissionRepository
  ) {}

  async paginate(
    options: IPaginationOptions,
    search: string
  ): Promise<Pagination<Role>> {
    let queryBuilder = this.roleRepository
      .createQueryBuilder("role")
      .select([
        "role.id",
        "role.name",
        "role.title",
        "role.description",
        "role.priority",
        "role.delete_able",
        "role.created_at"
      ]);
    if (search) {
      queryBuilder
        .where("role.name like :s", { s: `%${search}%` })
        .orWhere("role.title like :s", { s: `%${search}%` });
    }
    queryBuilder.orderBy("role.priority", "ASC");

    return await paginate<Role>(queryBuilder, options);
  }

  async store(dto: RoleStoreDto): Promise<RoleResponse> {
    await this.findRoleByName(dto.name);
    await this.roleFoundException();
    this.role = await this.roleRepository.store(dto);
    return {
      role: {
        id: this.role.id,
        name: this.role.name,
        title: this.role.title,
        priority: this.role.priority,
        description: this.role.description,
        created_at: this.role.created_at
      }
    };
  }

  async update(params, dto: RoleUpdateDto): Promise<RoleResponse> {
    const { id } = params;
    await this.findRoleById(id);
    await this.roleNotFoundException();
    if (this.role.name != dto.name) {
      await this.findRoleByName(dto.name);
      await this.roleFoundException();
    }
    await this.roleRepository.updateRole(id, dto);
    return {
      role: {
        id: this.role.id,
        name: this.role.name,
        title: this.role.title,
        priority: this.role.priority,
        description: this.role.description,
        created_at: this.role.created_at
      }
    };
  }

  async delete(params) {
    const { id } = params;
    await this.findRoleById(id);
    await this.roleNotFoundException();
    await this.roleDeleteAbleException();
    await this.syncPermissions();
    await this.syncUsers();
    await this.roleRepository.save(this.role);
    await this.roleRepository.delete(this.role.id);
  }

  async show(params): Promise<RoleShowResponse> {
    const { id } = params;
    await this.findRoleById(id, ["permissions"]);
    await this.roleNotFoundException();
    return {
      role: {
        id: this.role.id,
        name: this.role.name,
        title: this.role.title,
        priority: this.role.priority,
        description: this.role.description,
        created_at: this.role.created_at
      },
      rolePermissions: await this.getRolePermissions(),
      permissions: await this.permissionRepository.list()
    };
  }

  async permissions(params, dto: RolePermissionDto) {
    const { id } = params;
    await this.findRoleById(id, ["permissions"]);
    await this.roleNotFoundException();

    await this.syncPermissions(await this.findOrFailPermissionsByIds(dto.ids));
    await this.roleRepository.save(this.role);
  }

  // helper methods /////////////////////// /////////////////////// ///////////////////////

  async findRoleByName(name, relations = []) {
    this.role = await this.roleRepository.findOne({
      where: { name },
      relations
    });
  }

  async findRoleById(id, relations = []) {
    this.role = await this.roleRepository.findOneOrFail({
      where: { id },
      relations
    });
  }

  async syncPermissions(permissionIds = []) {
    this.role.permissions = Promise.resolve(permissionIds);
  }

  async syncUsers(userIds = []) {
    this.role.users = Promise.resolve([]);
  }

  async getRolePermissions() {
    return (await this.role.permissions).map(perm => {
      return {
        id: perm.id,
        name: perm.name,
        title: perm.title,
        module: perm.module
      };
    });
  }

  async findOrFailPermissionsByIds(ids) {
    let result = await this.permissionRepository.find({
      where: { id: In(ids) }
    });
    if (result.length !== ids.length) {
      throw new PermissionNotFoundException();
    }
    return result;
  }

  // exception handler methods /////////////////////// /////////////////////// ///////////

  async roleFoundException() {
    if (this.role) throw new RoleFoundException();
  }

  async roleNotFoundException() {
    if (!this.role) throw new RoleNotFoundException();
  }

  async roleDeleteAbleException() {
    if (this.role.delete_able == 0) throw new RoleDeleteAbleException();
  }
}
