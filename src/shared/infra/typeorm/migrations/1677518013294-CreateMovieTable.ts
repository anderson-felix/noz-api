import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateMovieTable1677518013294 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'movie',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'director',
            type: 'varchar',
          },
          {
            name: 'genres',
            type: 'json',
            default: `'[]'`,
          },
          {
            name: 'genres_string',
            type: 'varchar',
            default: '',
          },
          {
            name: 'actors',
            type: 'json',
            default: `'[]'`,
          },
          {
            name: 'actors_string',
            type: 'varchar',
            default: '',
          },
          {
            name: 'created_by',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FK_BOOK_USER_CREATOR',
            columnNames: ['created_by'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('movie', true);
  }
}
