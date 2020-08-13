import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  BeforeUpdate,
  ManyToMany,
  JoinTable,
  BeforeInsert,
  Index
} from "typeorm";
import { Role } from "./role.entity";

@Entity("permissions")
export class Permission extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("PERMISSIONS_NAME_INDEX")
  @Column({ type: "varchar", unique: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  title: string;

  @Index("PERMISSIONS_MODULE_INDEX")
  @Column({ type: "varchar" })
  module: string;

  @Column({ type: "smallint", default: 0 })
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
    type => Role,
    roles => roles.permissions
  )
  @JoinTable({
    name: "permission_role",
    joinColumns: [{ name: "permission_id" }],
    inverseJoinColumns: [{ name: "role_id" }]
  })
  roles: Promise<Role[]>;

  /////////////////////////// /////////////////////////// ///////////////////////////

  @BeforeInsert()
  beforInsert() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
}
