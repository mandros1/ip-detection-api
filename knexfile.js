require('dotenv').config();
const { knexSnakeCaseMappers } = require('objection');

module.exports = {

    migrations: { tableName: 'knex_migrations' },
    seeds: { tableName: './seeds' },
    client: 'postgres',
    connection: {
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      database: process.env.DB_NAME,
      user:     process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD
    },
    ...knexSnakeCaseMappers()

};
