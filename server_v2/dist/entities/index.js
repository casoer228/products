"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = exports.Unit = exports.Store = exports.Provider = exports.Product = exports.Producer = void 0;
const producer_entity_1 = require("./producer.entity");
Object.defineProperty(exports, "Producer", { enumerable: true, get: function () { return producer_entity_1.Producer; } });
const product_history_entity_1 = require("./product-history.entity");
const product_entity_1 = require("./product.entity");
Object.defineProperty(exports, "Currency", { enumerable: true, get: function () { return product_entity_1.Currency; } });
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return product_entity_1.Product; } });
Object.defineProperty(exports, "Unit", { enumerable: true, get: function () { return product_entity_1.Unit; } });
const provider_entity_1 = require("./provider.entity");
Object.defineProperty(exports, "Provider", { enumerable: true, get: function () { return provider_entity_1.Provider; } });
const store_entity_1 = require("./store.entity");
Object.defineProperty(exports, "Store", { enumerable: true, get: function () { return store_entity_1.Store; } });
exports.default = [
    producer_entity_1.Producer,
    product_entity_1.Product,
    provider_entity_1.Provider,
    store_entity_1.Store,
    product_history_entity_1.ProductHistory
];
//# sourceMappingURL=index.js.map