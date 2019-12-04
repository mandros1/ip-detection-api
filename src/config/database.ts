// import Knex from 'knex';
// // import * as Knex from 'knex'
// // const { knexSnakeCaseMappers } = require('objection');
// import {cofiguration} from '../../knex';
//
// // export const config = {
// //     migrations: { tableName: 'knex_migrations' },
// //     seeds: { tableName: './seeds' },
// //     client: 'postgres',
// //     connection: {
// //         host: process.env.DB_HOST,
// //         port: process.env.DB_PORT,
// //         database: process.env.DB_NAME,
// //         user:     process.env.DB_USERNAME,
// //         password: process.env.DB_PASSWORD
// //     },
// //     ...knexSnakeCaseMappers()
// // }
// console.log(`Configuration ${cofiguration}`);
// const instance: Knex = Knex(cofiguration as Knex.Config)
//
// export const knexInstance = instance;
//
// instance
//     .raw('select * from public.country_locations')
//     .then(() => {
//         console.log('Successfully got the data');
//     })
//     .catch(err => {
//         console.log('Failed miserably');
//         process.exit(1)
//     });
//
// export const db = () => instance;
