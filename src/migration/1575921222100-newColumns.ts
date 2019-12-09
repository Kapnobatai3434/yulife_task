import {MigrationInterface, QueryRunner} from "typeorm";

export class newColumns1575921222100 implements MigrationInterface {
    name = 'newColumns1575921222100'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "manager" ADD "userId" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "manager" DROP COLUMN "userId"`, undefined);
    }

}
