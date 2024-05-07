import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitiateTables1715121140101 implements MigrationInterface {
  name = 'InitiateTables1715121140101';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."jobs_employmenttypes_enum" AS ENUM('FULL_TIME', 'PART_TIME', 'SEASONAL')`,
    );
    await queryRunner.query(
      `CREATE TABLE "jobs" ("id" SERIAL NOT NULL, "businessId" integer NOT NULL, "name" character varying NOT NULL, "minHourlyPay" integer NOT NULL, "maxHourlyPay" integer NOT NULL, "employmentTypes" "public"."jobs_employmenttypes_enum" array NOT NULL DEFAULT '{}', "videoUrl" character varying NOT NULL, CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "businesses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "phoneNumber" character varying, "businessCity" character varying NOT NULL, "businessState" character varying NOT NULL, "isPublic" boolean NOT NULL, CONSTRAINT "UQ_31e657169754a8feaa08c17bc2b" UNIQUE ("name"), CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_31e657169754a8feaa08c17bc2" ON "businesses" ("name") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_ead37aad326717865fbb6f465d" ON "businesses" ("isPublic") `,
    );
    await queryRunner.query(
      `ALTER TABLE "jobs" ADD CONSTRAINT "FK_c567a20039e7f72eb7fe00409dc" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "jobs" DROP CONSTRAINT "FK_c567a20039e7f72eb7fe00409dc"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_ead37aad326717865fbb6f465d"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_31e657169754a8feaa08c17bc2"`,
    );
    await queryRunner.query(`DROP TABLE "businesses"`);
    await queryRunner.query(`DROP TABLE "jobs"`);
    await queryRunner.query(`DROP TYPE "public"."jobs_employmenttypes_enum"`);
  }
}
