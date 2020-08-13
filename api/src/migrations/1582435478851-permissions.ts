import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey
} from "typeorm";

const fkRoleId = new TableForeignKey({
  name: "FK_PERMISSION_ROLE_ROLE_ID_TO_ROLES",
  referencedTableName: "roles",
  referencedColumnNames: ["id"],
  columnNames: ["role_id"]
});
const fkPermissionId = new TableForeignKey({
  name: "FK_PERMISSION_ROLE_PERMISSION_ID_TO_PERMISSIONS",
  referencedTableName: "permissions",
  referencedColumnNames: ["id"],
  columnNames: ["permission_id"]
});

export class permissions1582435478851 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "permissions",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "name",
            type: "varchar",
            isUnique: true
          },
          {
            name: "title",
            type: "varchar",
            isNullable: true
          },
          {
            name: "module",
            type: "varchar"
          },
          {
            name: "delete_able",
            type: "smallint",
            default: 1
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
      "permissions",
      new TableIndex({
        name: "IDX_PERMISSIONS_NAME",
        columnNames: ["name"]
      })
    );

    await queryRunner.createIndex(
      "permissions",
      new TableIndex({
        name: "IDX_PERMISSIONS_MODULE",
        columnNames: ["module"]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "permission_role",
        columns: [
          {
            name: "role_id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "permission_id",
            type: "uuid",
            isPrimary: true
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKeys("permission_role", [
      fkRoleId,
      fkPermissionId
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKeys("permission_role", [
      fkRoleId,
      fkPermissionId
    ]);
    await queryRunner.dropTable("permission_role");
    await queryRunner.dropIndex("permissions", "IDX_PERMISSIONS_MODULE");
    await queryRunner.dropIndex("permissions", "IDX_PERMISSIONS_NAME");
    await queryRunner.dropTable("permissions");
  }
}
