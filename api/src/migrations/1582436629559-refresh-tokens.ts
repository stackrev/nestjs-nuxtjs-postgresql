import {
  MigrationInterface,
  QueryRunner,
  TableIndex,
  Table,
  TableForeignKey
} from "typeorm";

export class refreshTokens1582436629559 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "refresh_tokens",
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
            name: "client_id",
            type: "varchar"
          },
          {
            name: "ip_address",
            type: "varchar",
            isNullable: true
          },
          {
            name: "value",
            type: "text"
          },
          {
            name: "expires_at",
            type: "timestamp"
          }
        ]
      }),
      true
    );

    await queryRunner.createIndex(
      "refresh_tokens",
      new TableIndex({
        name: "IDX_REFRESH_TOKEN_USER_ID",
        columnNames: ["user_id"]
      })
    );

    await queryRunner.createIndex(
      "refresh_tokens",
      new TableIndex({
        name: "IDX_REFRESH_TOKEN_CLIENT_ID",
        columnNames: ["client_id"]
      })
    );

    await queryRunner.createForeignKey(
      "refresh_tokens",
      new TableForeignKey({
        name: "FK_REFRESH_TOKEN_USER_ID_TO_USERS",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey(
      "refresh_tokens",
      "FK_REFRESH_TOKEN_USER_ID_TO_USERS"
    );
    await queryRunner.dropIndex(
      "refresh_tokens",
      "IDX_REFRESH_TOKEN_CLIENT_ID"
    );
    await queryRunner.dropIndex("refresh_tokens", "IDX_REFRESH_TOKEN_USER_ID");
    await queryRunner.dropTable("refresh_tokens");
  }
}
