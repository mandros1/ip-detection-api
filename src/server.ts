import * as dotenv from 'dotenv';
dotenv.config();

import http from 'http';
import express from 'express';

import { applyMiddleware, applyRoutes } from './utils';
import { getBlacklisted, myMap, isBlacklisted } from './ip/ipManager';
import middleware from './middleware'
import routes from "./services/index";


process.on("uncaughtException", e => {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", e => {
    console.log(e);
    process.exit(1);
});


const router = express();

/**
 * Check if the current client IP address is blacklisted
 */
router.use( async function(req, res, next) {
    if(myMap === undefined) {
        await getBlacklisted(req, res, next);
    }
    if(myMap !== undefined) {
        await isBlacklisted(req, res, next);
    } else next();
});

// Apply middleware and routes
applyMiddleware(middleware, router);
applyRoutes(routes, router);

const { API_PORT = 3000 } = process.env;
const server = http.createServer(router);

server.listen(API_PORT, () => {
    // @ts-ignore
    console.log(`Server is running on localhost:${server.address().port}`)
});
