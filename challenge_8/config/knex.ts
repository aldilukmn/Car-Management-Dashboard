import knex from 'knex'
import config from '../knexfile'

export const environment = process.env.PRODUCTION ?? process.env.DEVELOPMENT as any

const db = knex(config[environment])

export default db
