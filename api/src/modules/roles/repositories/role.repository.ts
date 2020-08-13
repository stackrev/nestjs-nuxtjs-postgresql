import { Role } from "../entities/role.entity";
import { Repository, EntityRepository, In } from "typeorm";

@EntityRepository(Role)
export class RoleRepository extends Repository<Role> {
  /**
   * get role by name
   * @param name
   */
  async findByRoleName(name: string): Promise<Role> {
    return await this.findOne({ where: { name }, relations: ["permissions"] });
  }

  async findInByRoleNames(names: string[]) {
    return await this.find({
      where: { name: In(names) },
      relations: ["permissions"]
    });
  }

  async store(data: any, delete_able: boolean = true): Promise<Role> {
    let role = this.create({
      name: data.name,
      title: data.title,
      priority: data.priority,
      description: data.description,
      delete_able: delete_able ? 1 : 0
    });
    await this.save(role);
    return role;
  }

  async updateRole(id, data) {
    await this.update(
      { id },
      {
        name: data.name,
        title: data.title,
        priority: data.priority,
        description: data.description
      }
    );
  }

  async permissionNames(names: string[]): Promise<string[]> {
    let permissions: string[] = [];
    let roles = await this.findInByRoleNames(names);
    roles.forEach(async role => {
      let perms = await role.permissions;
      if (perms) {
        perms.forEach(permission => {
          permissions.push(permission.name);
        });
      }
    });
    return permissions;
  }
}
