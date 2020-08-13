import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class users1582430050093 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true
          },
          {
            name: "photo_id",
            type: "uuid",
            isNullable: true
          },
          {
            name: "mobile",
            type: "varchar",
            isUnique: true
          },
          {
            name: "username",
            type: "varchar",
            isUnique: true,
            isNullable: true
          },
          {
            name: "email",
            type: "varchar",
            isUnique: true,
            isNullable: true
          },
          {
            name: "name",
            type: "varchar",
            isNullable: true
          },
          {
            name: "family",
            type: "varchar",
            isNullable: true
          },
          {
            name: "password",
            type: "varchar",
            isNullable: true
          },
          {
            name: "remember_token",
            type: "varchar",
            isNullable: true
          },
          {
            name: "status",
            type: "smallint",
            default: 1
          },
          {
            name: "login_at",
            type: "timestamp",
            isNullable: true
          },
          {
            name: "logout_at",
            type: "timestamp",
            isNullable: true
          },
          {
            name: "email_verified_at",
            type: "timestamp",
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
          },
          {
            name: "deleted_at",
            type: "timestamp",
            isNullable: true
          }
        ]
      }),
      true
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "IDX_USERS_MOBILE",
        columnNames: ["mobile"]
      })
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "IDX_USERS_USERNAME",
        columnNames: ["username"]
      })
    );

    await queryRunner.createIndex(
      "users",
      new TableIndex({
        name: "IDX_USERS_EMAIL",
        columnNames: ["email"]
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropIndex("users", "IDX_USERS_EMAIL");
    await queryRunner.dropIndex("users", "IDX_USERS_USERNAME");
    await queryRunner.dropIndex("users", "IDX_USERS_MOBILE");
    await queryRunner.dropTable("users");
  }
}
