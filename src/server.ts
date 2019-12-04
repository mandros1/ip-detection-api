import * as dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';

import { applyMiddleware, applyRoutes } from './utils';
import middleware from './middleware'
import routes from "./services/index";
import errorHandlers from "./middleware/errorHandlers";

process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});

const router = express();
applyMiddleware(middleware, router);
applyRoutes(routes, router);
applyMiddleware(errorHandlers, router);

const { API_PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(API_PORT, () => {
    // @ts-ignore
    console.log(`Server is running on localhost:${server.address().port}`)
});
