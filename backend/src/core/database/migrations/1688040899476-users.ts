import { MigrationInterface, QueryRunner } from 'typeorm';

export class Users1688040899476 implements MigrationInterface {
  name = 'Users1688040899476';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "password" character varying NOT NULL, "role" character varying(15) NOT NULL DEFAULT 'user', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
