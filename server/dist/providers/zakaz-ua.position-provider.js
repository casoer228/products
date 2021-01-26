"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZakazUaPositionsProvider = void 0;
const node_fetch_1 = require("node-fetch");
const common_1 = require("@nestjs/common");
const utf8 = require("utf8");
let ZakazUaPositionsProvider = class ZakazUaPositionsProvider {
    pull() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.search(process.env.ZAKAZ_UA_BUCKWHEAT_SEARCH_STRING);
        });
    }
    search(q) {
        return __awaiter(this, void 0, void 0, function* () {
            const results = [];
            const searchResponse = yield this._search(q);
            for (const response of searchResponse) {
                for (const product of response.results) {
                    results.push({
                        externalId: product.sku,
                        imageUrl: product.img.s350x350,
                        price: product.price,
                        title: product.title,
                        webUrl: product.web_url,
                    });
                }
            }
            return results;
        });
    }
    _search(q, storeId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!storeId) {
                //@ts-ignore
                return Promise.all(process.env.ZAKAZ_UA_STORES_IDS.split(',').map(Number.parseInt).map(storeId => this._search(q, storeId).then(res => res[0])));
            }
            return node_fetch_1.default(utf8.encode(`${process.env.ZAKAZ_UA_API_URL}/stores/${storeId}/products/search/?q=${q}`), {
                "headers": {
                    "accept": "*/*",
                    "accept-language": "ru",
                    "cache-control": "no-cache",
                    "content-type": "application/json",
                    "pragma": "no-cache",
                    "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
                    "sec-ch-ua-mobile": "?0",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "same-site",
                    "x-chain": "metro",
                    "x-delivery-type": "undefined",
                    "x-version": "29"
                },
                "body": null,
                "method": "GET",
                //@ts-ignore
                "mode": "cors",
                "credentials": "include"
            })
                .then(res => res.json())
                .then(res => [res]);
        });
    }
};
ZakazUaPositionsProvider.hasSearch = true;
ZakazUaPositionsProvider = __decorate([
    common_1.Injectable()
], ZakazUaPositionsProvider);
exports.ZakazUaPositionsProvider = ZakazUaPositionsProvider;
//# sourceMappingURL=zakaz-ua.position-provider.js.map