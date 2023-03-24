import { MigrationInterface, QueryRunner } from "typeorm";

export class users1679568684518 implements MigrationInterface {
    name = 'users1679568684518'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "userId" uuid, CONSTRAINT "UQ_7f2ff64f259f1f23586495a809a" UNIQUE ("title"), CONSTRAINT "PK_6322e69009fa8c98239d8b9dd6e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_post" ADD CONSTRAINT "FK_61c64496bf096b321869175021a" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_post" DROP CONSTRAINT "FK_61c64496bf096b321869175021a"`);
        await queryRunner.query(`DROP TABLE "user_post"`);
        await queryRunner.query(`DROP TABLE "user"`);
    }

}
