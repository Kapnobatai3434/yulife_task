import {MigrationInterface, QueryRunner} from "typeorm";

export class newColumns51575923656611 implements MigrationInterface {
    name = 'newColumns51575923656611'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_b3ac840005ee4ed76a7f1c51d0"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userId"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "name" text NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "username" text NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "UQ_50842d4e3e27344504cad8769e9" UNIQUE ("username")`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "password" text NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "isActive" boolean NOT NULL DEFAULT true`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "isArchived" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "type" text NOT NULL DEFAULT 'user'`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b49b5545b68f45e740bf4debd1" ON "manager" ("id", "username") `, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP INDEX "IDX_b49b5545b68f45e740bf4debd1"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "type"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "updatedAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "createdAt"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "isArchived"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "isActive"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "password"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "UQ_50842d4e3e27344504cad8769e9"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "username"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "name"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "userId" character varying`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b3ac840005ee4ed76a7f1c51d0" ON "manager" ("id") `, undefined);
    }

}
