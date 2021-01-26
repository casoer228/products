import { PositionsHistoryService } from "./positions-history.service";
import { PositionsService } from "./positions.service";
import { RequestInjectorInterceptor } from "./request-injectior.interceptor";
import { ZakazUaPositionsProvider } from "./zakaz-ua.position-provider";

export {
    PositionsService,
    RequestInjectorInterceptor,
    ZakazUaPositionsProvider,
    PositionsHistoryService,
}

export default [
    PositionsService,
    RequestInjectorInterceptor,
    ZakazUaPositionsProvider,
    PositionsHistoryService,
];