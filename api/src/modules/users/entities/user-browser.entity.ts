import {
  Entity,
  Column,
  BaseEntity,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  PrimaryGeneratedColumn,
  Index
} from "typeorm";
import { User } from "./users.entity";

@Entity("user_browsers")
export class UserBrowsers extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Index("BROWSER_USER_ID_INDEX")
  @Column({ type: "varchar", nullable: false })
  user_id: string;

  @Index("BROWSER_TYPE_ID_INDEX")
  @Column({ type: "varchar", nullable: false, unique: true })
  type_id: string;

  @Column({ type: "varchar", nullable: true })
  ip: string;

  @Column({ type: "varchar", nullable: true })
  device_type: string;

  @Column({ type: "varchar", nullable: true })
  os: string;

  @Column({ type: "varchar", nullable: true })
  os_version: string;

  @Column({ type: "varchar", nullable: true })
  browser: string;

  @Column({ type: "varchar", nullable: true })
  browser_vendor: string;

  @Column({ type: "varchar", nullable: true })
  browser_version: string;

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

  @ManyToOne(
    type => User,
    user => user.browsers
  )
  @JoinColumn({ name: "user_id" })
  user: Promise<User>;

  /////////////////////////// /////////////////////////// ///////////////////////////

  @BeforeInsert()
  insertBefore() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  updateDate() {
    this.updated_at = new Date();
  }
}
