import type { Knex } from 'knex';

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  test: {
    client: 'sqlite3',
    connection: ':memory:',
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './database/seeds',
      extension: 'ts',
    },
  },
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    useNullAsDefault: true,
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './database/seeds',
      extension: 'ts',
    },
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './database/seeds',
      extension: 'ts',
    },
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      directory: './database/migrations',
      tableName: 'knex_migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './database/seeds',
      extension: 'ts',
    },
  },
};

export default config;
