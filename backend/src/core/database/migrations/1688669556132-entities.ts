import { MigrationInterface, QueryRunner } from 'typeorm';

export class Entities1688669556132 implements MigrationInterface {
  name = 'Entities1688669556132';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "refreshToken"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "tokens" ADD "refreshToken" character varying NOT NULL`,
    );
  }
}
