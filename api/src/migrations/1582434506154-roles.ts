import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey
} from "typeorm";

const fkRoleId = new TableForeignKey({
  name: "FK_ROLE_USER_ROLE_ID_TO_ROLES",
  referencedTableName: "roles",
  referencedColumnNames: ["id"],
  columnNames: ["role_id"]
});
const fkUserId = new TableForeignKey({
  name: "FK_ROLE_USER_USER_ID_TO_USERS",
  referencedTableName: "users",
  referencedColumnNames: ["id"],
  columnNames: ["user_id"]
});

export class roles1582434506154 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "roles",
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
            name: "description",
            type: "varchar",
            isNullable: true
          },
          {
            name: "priority",
            type: "smallint",
            default: 1
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
      "roles",
      new TableIndex({
        name: "IDX_ROLES_NAME",
        columnNames: ["name"]
      })
    );

    await queryRunner.createTable(
      new Table({
        name: "role_user",
        columns: [
          {
            name: "role_id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "user_id",
            type: "uuid",
            isPrimary: true
          }
        ]
      }),
      true
    );

    await queryRunner.createForeignKeys("role_user", [fkRoleId, fkUserId]);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKeys("role_user", [fkRoleId, fkUserId]);
    await queryRunner.dropTable("role_user");
    await queryRunner.dropIndex("roles", "IDX_ROLES_NAME");
    await queryRunner.dropTable("roles");
  }
}
