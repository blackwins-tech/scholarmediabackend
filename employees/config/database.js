const knex = require('knex')

const config = {
  client: process.env.DB_CLIENT,
  connection: {
    user: process.env.DB_USER || db_username,
  
    database: process.env.DB_DATABASE|| db_name,
    password: process.env.DB_PASSWORD || db_password,
    host: process.env.DB_HOST || db_host,
    port: process.env.DB_PORT 
  },
  pool: { min: 2, max: 50 }
}

const db = knex(config)

module.exports = { db, config }