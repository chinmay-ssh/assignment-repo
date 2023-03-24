import { MigrationInterface, QueryRunner } from "typeorm";

export class loginLogs1679573138802 implements MigrationInterface {
    name = 'loginLogs1679573138802'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "login_log" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "refreshToken" character varying NOT NULL, "accessToken" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "isValidate" boolean NOT NULL, "userId" uuid, CONSTRAINT "REL_fa34abc1d6d5b7c762fd0ccba9" UNIQUE ("userId"), CONSTRAINT "PK_829ba3026b2886c163fb5c91607" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "login_log" ADD CONSTRAINT "FK_fa34abc1d6d5b7c762fd0ccba96" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "login_log" DROP CONSTRAINT "FK_fa34abc1d6d5b7c762fd0ccba96"`);
        await queryRunner.query(`DROP TABLE "login_log"`);
    }

}
