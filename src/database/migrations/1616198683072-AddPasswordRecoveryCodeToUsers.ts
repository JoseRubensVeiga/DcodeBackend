import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddPasswordRecoveryCodeToUsers1616198683072
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'recovery_password_code',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'recovery_password_code');
  }
}
