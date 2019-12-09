import {MigrationInterface, QueryRunner} from "typeorm";

export class newColumns51575923093103 implements MigrationInterface {
    name = 'newColumns51575923093103'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" ADD "userId" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "userId"`, undefined);
    }

}
