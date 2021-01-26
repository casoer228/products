import { ProducersService } from "./producers.service";
import { ProductsHistoryService } from "./products-history.service";
import { ProductsService } from "./products.service";
import { RequestInjectorInterceptor } from "./request-injector.interceptor";
import { StoresService } from "./stores.service";
import { ZakazUaProvider } from "./zakaz-ua.provider";

export default [
    ProductsService,
    RequestInjectorInterceptor,
    ZakazUaProvider,
    ProductsHistoryService,
    ProducersService,
    StoresService,
];

export {
    ProductsService,
    RequestInjectorInterceptor,
    ZakazUaProvider,
    ProductsHistoryService,
    ProducersService,
    StoresService,
}