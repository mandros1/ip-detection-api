"use strict";
exports.__esModule = true;
exports.applyMiddleware = function (middleware, router) {
    middleware.forEach(function (middlewareItem) {
        middlewareItem(router);
    });
};
exports.applyRoutes = function (routes, router) {
    routes.forEach(function (route) {
        var path = route.path, method = route.method, handler = route.handler;
        router[method](path, handler);
    });
};
