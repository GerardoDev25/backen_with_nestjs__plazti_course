import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIndex1671298052153 implements MigrationInterface {
  name = 'addIndex1671298052153';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE INDEX "IDX_84fcd7d6abd6b5ae40d3536894" ON "product" ("stock") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0decfc62b4e4834e2024a9d9c4" ON "product" ("price", "stock") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_0decfc62b4e4834e2024a9d9c4"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_84fcd7d6abd6b5ae40d3536894"`,
    );
  }
}
