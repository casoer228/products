"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const producers_controller_1 = require("./producers.controller");
const products_history_controller_1 = require("./products-history.controller");
const products_controller_1 = require("./products.controller");
const stores_controller_1 = require("./stores.controller");
exports.default = [
    products_controller_1.ProductsController,
    products_history_controller_1.ProductsHistoryController,
    producers_controller_1.ProducersController,
    stores_controller_1.StoresController,
];
//# sourceMappingURL=index.js.map