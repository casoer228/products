import { ProductsHistoryService } from "./products-history.service";
import { ProductsService } from "./products.service";
import { RequestInjectorInterceptor } from "./request-injector.interceptor";
import { ZakazUaProvider } from "./zakaz-ua.provider";

export default [
    ProductsService,
    RequestInjectorInterceptor,
    ZakazUaProvider,
    ProductsHistoryService
];

export {
    ProductsService,
    RequestInjectorInterceptor,
    ZakazUaProvider,
    ProductsHistoryService
}