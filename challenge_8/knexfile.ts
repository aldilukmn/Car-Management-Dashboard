import type { Knex } from 'knex'
import dotenv from 'dotenv'
dotenv.config()

// Update with your config settings.

const config: Record<string, Knex.Config> = {
  development: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_NAME,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      host: 'localhost',
      port: 5432
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'binar_rental_car',
      user: 'postgres',
      password: 'admin'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: process.env.DB_CLIENT_PRODUCTION,
    connection: {
      database: process.env.DB_NAME_PRODUCTION,
      user: process.env.DB_USER_PRODUCTION,
      password: process.env.DB_PASSWORD_PRODUCTION,
      host: process.env.DB_HOST_PROUCTION,
      ssl: { rejectUnauthorized: false }, // Set rejectUnauthorized to false to bypass self-signed certificate issues
      sslmode: 'require'
    } as any,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }
}

export default config
