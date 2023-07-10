import { MigrationInterface, QueryRunner } from 'typeorm';

export class Trt1688835947307 implements MigrationInterface {
  name = 'Trt1688835947307';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "name" character varying(15) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "name" character varying(15) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "categories" ADD "name" character varying(45) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "name" character varying(35) NOT NULL`,
    );
  }
}
