import {
  Entity,
  Column,
  BaseEntity,
  BeforeUpdate,
  ObjectID,
  BeforeInsert,
  Unique,
  OneToMany,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable
} from "typeorm";
import { Code } from "../../auth/entities/code.entity";
import { RefreshToken } from "../../auth/entities/refresh-token.entity";
import { UserDevice } from "./user-device.entity";
import { UserBrowsers } from "./user-browser.entity";
import { Role } from "../../roles/entities/role.entity";

@Entity("users")
@Unique(["mobile", "email", "username"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", nullable: true })
  photo_id: string;

  @Column({ type: "varchar", nullable: true })
  mobile: string;

  @Column({ type: "varchar", nullable: true })
  username: string;

  @Column({ type: "varchar", nullable: true })
  email: string;

  @Column({ type: "varchar", nullable: true })
  name: string;

  @Column({ type: "varchar", nullable: true })
  family: string;

  @Column({ type: "varchar", nullable: true })
  password: string;

  @Column({ type: "varchar", length: 100, nullable: true })
  remember_token: string;

  @Column({ type: "smallint", default: 1 })
  status: number;

  @Column({ type: "timestamp", nullable: true })
  login_at: Date;

  @Column({ type: "timestamp", nullable: true })
  logout_at: Date;

  @Column({ type: "timestamp", nullable: true })
  email_verified_at: Date;

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

  @Column({ type: "timestamp", nullable: true })
  deleted_at: Date;

  /////////////////////////// /////////////////////////// ///////////////////////////

  @OneToMany(
    type => Code,
    code => code.user
  )
  code: Promise<Code>;

  @OneToMany(
    type => RefreshToken,
    tokens => tokens.user
  )
  tokens: Promise<RefreshToken[]>;

  @OneToMany(
    type => UserBrowsers,
    tokens => tokens.user
  )
  browsers: Promise<UserBrowsers[]>;

  @OneToMany(
    type => UserDevice,
    devices => devices.user
  )
  devices: Promise<UserDevice[]>;

  @ManyToMany(
    type => Role,
    roles => roles.users
  )
  @JoinTable({
    name: "role_user",
    joinColumns: [{ name: "user_id" }],
    inverseJoinColumns: [{ name: "role_id" }]
  })
  roles: Promise<Role[]>;

  /////////////////////////// /////////////////////////// ///////////////////////////

  @BeforeInsert()
  beforeInsert() {
    this.status = 1;
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
}
