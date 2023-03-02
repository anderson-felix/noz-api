import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserMovieRelationTable1677518028062
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'user_movie_relation',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'user_id',
            type: 'uuid',
          },
          {
            name: 'movie_id',
            type: 'uuid',
          },
          {
            name: 'rating',
            type: 'smallint',
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
            name: 'FK_USER_MOVIE_RELATION_USER',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onUpdate: 'CASCADE',
            onDelete: 'SET NULL',
          },
          {
            name: 'FK_USER_MOVIE_RELATION_MOVIE',
            columnNames: ['movie_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'movie',
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          },
        ],
        checks: [
          {
            name: 'CHECK_MOVIE_RATING',
            columnNames: ['rating'],
            expression: 'rating >= 1 AND rating <= 4',
          },
        ],
        indices: [
          {
            name: 'UQ_USER_MOVIE_RELATION',
            columnNames: ['user_id', 'movie_id'],
            isUnique: true,
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_movie_relation', true);
  }
}
