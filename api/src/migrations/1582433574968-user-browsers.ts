import {
  MigrationInterface,
  QueryRunner,
  TableIndex,
  TableForeignKey,
  Table
} from "typeorm";

export class userBrowsers1582433574968 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "user_browsers",
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
            name: "type_id",
            type: "varchar",
            isUnique: true
          },
          {
            name: "ip",
            type: "varchar",
            isNullable: true
          },
          {
            name: "device_type",
            type: "varchar",
            isNullable: true
          },
          {
            name: "os",
            type: "varchar",
            isNullable: true
          },
          {
            name: "os_version",
            type: "varchar",
            isNullable: true
          },
          {
            name: "browser",
            type: "varchar",
            isNullable: true
          },
          {
            name: "browser_vendor",
            type: "varchar",
            isNullable: true
          },
          {
            name: "browser_version",
            type: "varchar",
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
      "user_browsers",
      new TableIndex({
        name: "IDX_USER_BROWSER_USER_ID",
        columnNames: ["user_id"]
      })
    );

    await queryRunner.createIndex(
      "user_browsers",
      new TableIndex({
        name: "IDX_USER_BROWSER_TYPE_ID",
        columnNames: ["type_id"]
      })
    );

    await queryRunner.createForeignKey(
      "user_browsers",
      new TableForeignKey({
        name: "FK_USER_BROWSER_USER_ID_TO_USERS",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      "user_browsers",
      "FK_USER_BROWSER_USER_ID_TO_USERS"
    );
    await queryRunner.dropIndex("user_browsers", "IDX_USER_BROWSER_TYPE_ID");
    await queryRunner.dropIndex("user_browsers", "IDX_USER_BROWSER_USER_ID");
    await queryRunner.dropTable("user_browsers");
  }
}
