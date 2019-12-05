"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
require('dotenv').config();
var knexSnakeCaseMappers = require('objection').knexSnakeCaseMappers;
exports.cofiguration = {
    development: __assign({ migrations: { tableName: 'knex_migrations' }, seeds: { tableName: './seeds' }, client: 'postgres', connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            database: process.env.DB_NAME,
            user: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD
        } }, knexSnakeCaseMappers()),
    staging: {
    // To be defined
    },
    production: {
    // To be defined
    }
};
