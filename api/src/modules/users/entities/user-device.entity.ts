import {
  Entity,
  Column,
  BaseEntity,
  BeforeUpdate,
  ManyToOne,
  JoinColumn,
  BeforeInsert,
  PrimaryGeneratedColumn
} from "typeorm";
import { User } from "./users.entity";
import { DeviceType } from "../enums/device-type.enum";

@Entity("user_devices")
export class UserDevice extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar" })
  user_id: string;

  @Column({ type: "enum", enum: DeviceType, nullable: true })
  type: DeviceType;

  @Column({ type: "varchar", nullable: true })
  type_version: string;

  @Column({ type: "varchar", nullable: true })
  type_id: string;

  @Column({ type: "varchar", nullable: true })
  brand_name: string;

  @Column({ type: "varchar", nullable: true })
  device_model: string;

  @Column({ type: "varchar", nullable: true })
  app_version: string;

  @Column({ type: "text", nullable: true })
  firebase_token: string;

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
    user => user.devices
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
