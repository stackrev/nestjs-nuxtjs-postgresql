import { Repository, EntityRepository } from "typeorm";
import { User } from "../entities/users.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByUsername(username: string) {
    return await this.findOne({
      where: { username },
      relations: ["roles", "browsers"]
    });
  }

  async createEmptyUser(): Promise<User> {
    const user = new User();
    await user.save();
    return user;
  }

  async deleteUser(id) {
    await this.createQueryBuilder()
      .delete()
      .from(User)
      .where("id = :id", { id })
      .execute();
  }

  async updateUser(id, data) {
    await this.createQueryBuilder()
      .update(User)
      .set(data)
      .where("id=:id", { id })
      .execute();
  }
}
