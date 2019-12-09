import { MigrationInterface, QueryRunner } from 'typeorm';

export class another1575879922134 implements MigrationInterface {
  name = 'another1575879922134';

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "manager" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "type" text NOT NULL DEFAULT 'user', "subordinatesId" uuid, CONSTRAINT "UQ_50842d4e3e27344504cad8769e9" UNIQUE ("username"), CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_b49b5545b68f45e740bf4debd1" ON "manager" ("id", "username") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "username" text NOT NULL, "password" text NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "isArchived" boolean NOT NULL DEFAULT false, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "type" text NOT NULL DEFAULT 'user', "managerId" uuid, CONSTRAINT "UQ_78a916df40e02a9deb1c4b75edb" UNIQUE ("username"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_72da1f98d8d8a4f2fb77754e2e" ON "user" ("id", "username") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" ADD CONSTRAINT "FK_f549ea2d7b6c014b60b6ed63dd4" FOREIGN KEY ("subordinatesId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_df69481de1f438f2082e4d54749" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_df69481de1f438f2082e4d54749"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "manager" DROP CONSTRAINT "FK_f549ea2d7b6c014b60b6ed63dd4"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_72da1f98d8d8a4f2fb77754e2e"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_b49b5545b68f45e740bf4debd1"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "manager"`, undefined);
  }
}
