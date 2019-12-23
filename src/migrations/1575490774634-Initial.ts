import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Initial1575490774634 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'user',
        columns: [
          {
            name: 'id',
            type: 'bigserial',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'username',
            type: 'varchar(16)',
            isUnique: true,
          },
          {
            name: 'password_hash',
            type: 'varchar',
          },
          {
            name: 'bio',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'image',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'article',
        columns: [
          {
            name: 'id',
            type: 'bigserial',
            isPrimary: true,
          },
          {
            name: 'slug',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'title',
            type: 'varchar',
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
          },
          {
            name: 'author_id',
            type: 'bigint',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['author_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { columnNames: ['author_id'] },
          { columnNames: ['created_at'] },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'tag',
        columns: [
          {
            name: 'id',
            type: 'bigserial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'comment',
        columns: [
          {
            name: 'id',
            type: 'bigserial',
            isPrimary: true,
          },
          {
            name: 'body',
            type: 'text',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
          },
          {
            name: 'author_id',
            type: 'bigint',
          },
          {
            name: 'article_id',
            type: 'bigint',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['author_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'article',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { columnNames: ['author_id'] },
          { columnNames: ['article_id'] },
          { columnNames: ['created_at'] },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_following',
        columns: [
          {
            name: 'follower_id',
            type: 'bigint',
          },
          {
            name: 'following_id',
            type: 'bigint',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['follower_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['following_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
        ],
        indices: [
          { columnNames: ['follower_id', 'following_id'], isUnique: true },
        ],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'user_favorite',
        columns: [
          {
            name: 'user_id',
            type: 'bigint',
          },
          {
            name: 'article_id',
            type: 'bigint',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'article',
            onDelete: 'CASCADE',
          },
        ],
        indices: [{ columnNames: ['user_id', 'article_id'], isUnique: true }],
      }),
    );

    await queryRunner.createTable(
      new Table({
        name: 'article_tag',
        columns: [
          {
            name: 'article_id',
            type: 'bigint',
          },
          {
            name: 'tag_id',
            type: 'bigint',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['article_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'article',
            onDelete: 'CASCADE',
          },
          {
            columnNames: ['tag_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tag',
            onDelete: 'CASCADE',
          },
        ],
        indices: [{ columnNames: ['article_id', 'tag_id'], isUnique: true }],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable('article_tag');
    await queryRunner.dropTable('user_favorite');
    await queryRunner.dropTable('user_following');
    await queryRunner.dropTable('comment');
    await queryRunner.dropTable('tag');
    await queryRunner.dropTable('article');
    await queryRunner.dropTable('user');
  }
}
