"use strict";
exports.__esModule = true;
var dotenv = require("dotenv");
dotenv.config();
var http_1 = require("http");
var express_1 = require("express");
var utils_1 = require("./utils");
var middleware_1 = require("./middleware");
var index_1 = require("./services/index");
process.on("uncaughtException", function (e) {
    console.log(e);
    process.exit(1);
});
process.on("unhandledRejection", function (e) {
    console.log(e);
    process.exit(1);
});
var router = express_1["default"]();
utils_1.applyMiddleware(middleware_1["default"], router);
utils_1.applyRoutes(index_1["default"], router);
// applyMiddleware(errorHandlers, router);
var _a = process.env.API_PORT, API_PORT = _a === void 0 ? 3000 : _a;
var server = http_1["default"].createServer(router);
server.listen(API_PORT, function () {
    // @ts-ignore
    console.log("Server is running on localhost:" + server.address().port);
});
