import { Permission } from "../entities/permission.entity";
import { Repository, EntityRepository } from "typeorm";

@EntityRepository(Permission)
export class PermissionRepository extends Repository<Permission> {
  async list() {
    return await this.find({
      select: ["id", "name", "title", "module"],
      order: {
        module: "ASC"
      }
    });
  }
}
