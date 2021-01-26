import { ProductsService } from "../providers";
import { ProducersController } from "./producers.controller";
import { ProductsHistoryController } from "./products-history.controller";
import { ProductsController } from "./products.controller";
import { StoresController } from "./stores.controller";

export default [
    ProductsController,
    ProductsHistoryController,
    ProducersController,
    StoresController,
]