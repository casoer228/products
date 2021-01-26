"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoresService = exports.ProducersService = exports.ProductsHistoryService = exports.ZakazUaProvider = exports.RequestInjectorInterceptor = exports.ProductsService = void 0;
const producers_service_1 = require("./producers.service");
Object.defineProperty(exports, "ProducersService", { enumerable: true, get: function () { return producers_service_1.ProducersService; } });
const products_history_service_1 = require("./products-history.service");
Object.defineProperty(exports, "ProductsHistoryService", { enumerable: true, get: function () { return products_history_service_1.ProductsHistoryService; } });
const products_service_1 = require("./products.service");
Object.defineProperty(exports, "ProductsService", { enumerable: true, get: function () { return products_service_1.ProductsService; } });
const request_injector_interceptor_1 = require("./request-injector.interceptor");
Object.defineProperty(exports, "RequestInjectorInterceptor", { enumerable: true, get: function () { return request_injector_interceptor_1.RequestInjectorInterceptor; } });
const stores_service_1 = require("./stores.service");
Object.defineProperty(exports, "StoresService", { enumerable: true, get: function () { return stores_service_1.StoresService; } });
const zakaz_ua_provider_1 = require("./zakaz-ua.provider");
Object.defineProperty(exports, "ZakazUaProvider", { enumerable: true, get: function () { return zakaz_ua_provider_1.ZakazUaProvider; } });
exports.default = [
    products_service_1.ProductsService,
    request_injector_interceptor_1.RequestInjectorInterceptor,
    zakaz_ua_provider_1.ZakazUaProvider,
    products_history_service_1.ProductsHistoryService,
    producers_service_1.ProducersService,
    stores_service_1.StoresService,
];
//# sourceMappingURL=index.js.map