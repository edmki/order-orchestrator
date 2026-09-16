import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateOrders1789587781595 implements MigrationInterface {
  name = 'CreateOrders1789587781595';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "orders" ("id" uuid NOT NULL, "order_id" character varying NOT NULL, "idempotency_key" character varying NOT NULL, "customer" jsonb NOT NULL, "items" jsonb NOT NULL, "currency" character varying(3) NOT NULL, "status" character varying NOT NULL DEFAULT 'RECEIVED', "enrichmentData" jsonb, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX "IDX_59d6b7756aeb6cbb43a093d15a" ON "orders"  ("idempotency_key") `,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX "public"."IDX_59d6b7756aeb6cbb43a093d15a"`,
    );
    await queryRunner.query(`DROP TABLE "orders"`);
  }
}
