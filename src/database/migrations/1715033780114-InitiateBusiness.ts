import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitiateBusiness1715033780114 implements MigrationInterface {
  name = 'InitiateBusiness1715033780114';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "businesses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying, "businessCity" character varying NOT NULL, "businessState" character varying NOT NULL, "isPublic" boolean NOT NULL, CONSTRAINT "UQ_31e657169754a8feaa08c17bc2b" UNIQUE ("name"), CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31e657169754a8feaa08c17bc2" ON "businesses" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ead37aad326717865fbb6f465d" ON "businesses" ("isPublic") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ead37aad326717865fbb6f465d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31e657169754a8feaa08c17bc2"`,
    );
    await queryRunner.query(`DROP TABLE "businesses"`);
  }
}
