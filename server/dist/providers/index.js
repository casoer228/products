"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionsHistoryService = exports.ZakazUaPositionsProvider = exports.RequestInjectorInterceptor = exports.PositionsService = void 0;
const positions_history_service_1 = require("./positions-history.service");
Object.defineProperty(exports, "PositionsHistoryService", { enumerable: true, get: function () { return positions_history_service_1.PositionsHistoryService; } });
const positions_service_1 = require("./positions.service");
Object.defineProperty(exports, "PositionsService", { enumerable: true, get: function () { return positions_service_1.PositionsService; } });
const request_injectior_interceptor_1 = require("./request-injectior.interceptor");
Object.defineProperty(exports, "RequestInjectorInterceptor", { enumerable: true, get: function () { return request_injectior_interceptor_1.RequestInjectorInterceptor; } });
const zakaz_ua_position_provider_1 = require("./zakaz-ua.position-provider");
Object.defineProperty(exports, "ZakazUaPositionsProvider", { enumerable: true, get: function () { return zakaz_ua_position_provider_1.ZakazUaPositionsProvider; } });
exports.default = [
    positions_service_1.PositionsService,
    request_injectior_interceptor_1.RequestInjectorInterceptor,
    zakaz_ua_position_provider_1.ZakazUaPositionsProvider,
    positions_history_service_1.PositionsHistoryService,
];
//# sourceMappingURL=index.js.map