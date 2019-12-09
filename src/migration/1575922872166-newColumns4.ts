import {MigrationInterface, QueryRunner} from "typeorm";

export class newColumns41575922872166 implements MigrationInterface {
    name = 'newColumns41575922872166'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_df69481de1f438f2082e4d54749"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b3ac840005ee4ed76a7f1c51d0"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "managerId"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "managerId" uuid`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b3ac840005ee4ed76a7f1c51d0" ON "manager" ("id") `, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_df69481de1f438f2082e4d54749" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_df69481de1f438f2082e4d54749"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_b3ac840005ee4ed76a7f1c51d0"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "managerId"`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD "managerId" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "id"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD "id" SERIAL NOT NULL`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_b3ac840005ee4ed76a7f1c51d0" ON "manager" ("id") `, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "PK_b3ac840005ee4ed76a7f1c51d01" PRIMARY KEY ("id")`, undefined);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_df69481de1f438f2082e4d54749" FOREIGN KEY ("managerId") REFERENCES "manager"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
