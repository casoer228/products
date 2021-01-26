import { Producer } from "./producer.entity";
import { ProductHistory } from "./product-history.entity";
import { Currency, Product, Unit } from "./product.entity";
import { Provider } from "./provider.entity";
import { Store } from "./store.entity";

export default [
    Producer,
    Product,
    Provider,
    Store,
    ProductHistory
]

export {
    Producer,
    Product,
    Provider,
    Store,
    Unit,
    Currency
}