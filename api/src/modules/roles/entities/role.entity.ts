import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  BeforeInsert
} from "typeorm";
import { Permission } from "./permission.entity";
import { User } from "../../users/entities/users.entity";

@Entity("roles")
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", unique: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  title: string;

  @Column({ type: "varchar", nullable: true })
  description: string;

  @Column({ type: "smallint", default: 1 })
  priority: number;

  @Column({ type: "smallint", default: 1 })
  delete_able: number;

  @Column({
    type: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  created_at: Date;

  @Column({
    type: "timestamp",
    nullable: true,
    default: () => "CURRENT_TIMESTAMP"
  })
  updated_at: Date;

  /////////////////////////// /////////////////////////// ///////////////////////////

  @ManyToMany(
    type => User,
    users => users.roles
  )
  @JoinTable({
    name: "role_user",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "user_id" }]
  })
  users: Promise<User[]>;

  @ManyToMany(
    type => Permission,
    permissions => permissions.roles
  )
  @JoinTable({
    name: "permission_role",
    joinColumns: [{ name: "role_id" }],
    inverseJoinColumns: [{ name: "permission_id" }]
  })
  permissions: Promise<Permission[]>;

  /////////////////////////// /////////////////////////// ///////////////////////////

  @BeforeInsert()
  beforeInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
}
