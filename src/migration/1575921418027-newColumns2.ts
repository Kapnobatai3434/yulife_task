import {MigrationInterface, QueryRunner} from "typeorm";

export class newColumns21575921418027 implements MigrationInterface {
    name = 'newColumns21575921418027'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "manager" DROP CONSTRAINT "FK_f549ea2d7b6c014b60b6ed63dd4"`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "subordinatesId"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "manager" ADD "subordinatesId" uuid`, undefined);
        await queryRunner.query(`ALTER TABLE "manager" ADD CONSTRAINT "FK_f549ea2d7b6c014b60b6ed63dd4" FOREIGN KEY ("subordinatesId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

}
