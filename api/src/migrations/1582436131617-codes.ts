import {
  MigrationInterface,
  QueryRunner,
  TableIndex,
  Table,
  TableForeignKey
} from "typeorm";

export class codes1582436131617 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: "codes",
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
            name: "code",
            type: "varchar"
          },
          {
            name: "hash",
            type: "varchar"
          },
          {
            name: "ip",
            type: "varchar",
            isNullable: true
          },
          {
            name: "status",
            type: "smallint",
            default: 1
          },
          {
            name: "expired_at",
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
          }
        ]
      }),
      true
    );

    await queryRunner.createIndex(
      "codes",
      new TableIndex({
        name: "IDX_CODES_USER_ID",
        columnNames: ["user_id"]
      })
    );

    await queryRunner.createIndex(
      "codes",
      new TableIndex({
        name: "IDX_CODES_CODE",
        columnNames: ["code"]
      })
    );

    await queryRunner.createIndex(
      "codes",
      new TableIndex({
        name: "IDX_CODES_HASH",
        columnNames: ["hash"]
      })
    );

    await queryRunner.createForeignKey(
      "codes",
      new TableForeignKey({
        name: "FK_CODES_USER_ID_TO_USERS",
        referencedTableName: "users",
        referencedColumnNames: ["id"],
        columnNames: ["user_id"],
        onDelete: "CASCADE"
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropForeignKey("codes", "FK_CODES_USER_ID_TO_USERS");
    await queryRunner.dropIndex("codes", "IDX_CODES_HASH");
    await queryRunner.dropIndex("codes", "IDX_CODES_CODE");
    await queryRunner.dropIndex("codes", "IDX_CODES_USER_ID");
    await queryRunner.dropTable("codes");
  }
}
