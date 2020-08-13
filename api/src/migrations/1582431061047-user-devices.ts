import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey
} from "typeorm";

export class userDevices1582431061047 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "user_devices",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "user_id",
            type: "uuid"
          },
          {
            name: "type",
            type: "varchar",
            isNullable: true
          },
          {
            name: "type_version",
            type: "varchar",
            isNullable: true
          },
          {
            name: "type_id",
            type: "varchar",
            isNullable: true
          },
          {
            name: "brand_name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "device_model",
            type: "varchar",
            isNullable: true
          },
          {
            name: "app_version",
            type: "varchar",
            isNullable: true
          },
          {
            name: "firebase_token",
            type: "text",
            isNullable: true
          },
          {
            name: "created_at",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP"
          },
          {
            name: "updated_at",
            type: "timestamp",
            isNullable: true,
            default: "CURRENT_TIMESTAMP"
          }
        ]
      }),
      true
    );

    await queryRunner.createIndex(
      "user_devices",
      new TableIndex({
        name: "IDX_USER_DEVICES_USER_ID",
        columnNames: ["user_id"]
      })
    );

    await queryRunner.createIndex(
      "user_devices",
      new TableIndex({
        name: "IDX_USER_DEVICES_TYPE_ID",
        columnNames: ["type_id"]
      })
    );

    await queryRunner.createForeignKey(
      "user_devices",
      new TableForeignKey({
        name: "FK_USER_DEVICES_USER_ID_TO_USERS",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      "user_devices",
      "FK_USER_DEVICES_USER_ID_TO_USERS"
    );
    await queryRunner.dropIndex("user_devices", "IDX_USER_DEVICES_TYPE_ID");
    await queryRunner.dropIndex("user_devices", "IDX_USER_DEVICES_USER_ID");
    await queryRunner.dropTable("user_devices");
  }
}
