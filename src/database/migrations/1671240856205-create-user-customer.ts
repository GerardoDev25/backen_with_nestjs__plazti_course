import { MigrationInterface, QueryRunner } from 'typeorm';

export class createUserCustomer1671240856205 implements MigrationInterface {
  name = 'createUserCustomer1671240856205';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "name"`);
    await queryRunner.query(
      `ALTER TABLE "product" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(`ALTER TABLE "user" ADD "customerId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce" UNIQUE ("customerId")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "createAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "user_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying(100) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "id" DROP DEFAULT`,
    );
    await queryRunner.query(`DROP SEQUENCE "customer_id_seq"`);
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" DROP CONSTRAINT "UQ_2b5187e7475dcc88f25bec39672"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce" FOREIGN KEY ("customerId") REFERENCES "customer"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "FK_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "phone"`);
    await queryRunner.query(
      `ALTER TABLE "customer" ADD "phone" character varying(10) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "UQ_2b5187e7475dcc88f25bec39672" UNIQUE ("lastName")`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ADD CONSTRAINT "UQ_ac1455877a69957f7466d5dc78e" UNIQUE ("name")`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "customer_id_seq" OWNED BY "customer"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "customer" ALTER COLUMN "id" SET DEFAULT nextval('"customer_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "role" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email")`,
    );
    await queryRunner.query(
      `CREATE SEQUENCE IF NOT EXISTS "user_id_seq" OWNED BY "user"."id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ALTER COLUMN "id" SET DEFAULT nextval('"user_id_seq"')`,
    );
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "customer" DROP COLUMN "createAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" DROP CONSTRAINT "UQ_6c687a8fa35b0ae35ce766b56ce"`,
    );
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "customerId"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
    await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createAt"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "name" character varying(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_065d4d8f3b5adb4a08841eae3c8" UNIQUE ("name")`,
    );
  }
}
