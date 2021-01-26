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
var ZakazUaProvider_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZakazUaProvider = void 0;
const node_fetch_1 = require("node-fetch");
const common_1 = require("@nestjs/common");
const utf8 = require("utf8");
const entities_1 = require("../entities");
const typeorm_1 = require("typeorm");
let ZakazUaProvider = ZakazUaProvider_1 = class ZakazUaProvider {
    static get id() {
        return 'zakaz-ua';
    }
    pull() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.search(process.env.ZAKAZ_UA_BUCKWHEAT_SEARCH_STRING);
        });
    }
    search(q) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const res = [];
            const stores = yield typeorm_1.getRepository(entities_1.Store).find({
                where: {
                    providerId: ZakazUaProvider_1.id
                }
            });
            for (const store of stores) {
                const storeProducts = yield this._search(q, store).then(r => r.results);
                for (const storeProduct of storeProducts) {
                    res.push({
                        storeExternalId: store.externalId,
                        producer: {
                            externalId: storeProduct.producer.trademark_slug,
                            name: storeProduct.producer.trademark,
                            imageURL: (_a = storeProduct.producer.logo) === null || _a === void 0 ? void 0 : _a.s64x64,
                        },
                        title: storeProduct.title,
                        currency: storeProduct.currency,
                        unit: storeProduct.unit,
                        webURL: storeProduct.web_url,
                        weight: storeProduct.weight,
                        description: storeProduct.description,
                        imageURL: storeProduct.img.s350x350,
                        price: storeProduct.price,
                        externalId: storeProduct.sku,
                    });
                }
            }
            return res;
        });
    }
    _search(q, store) {
        return __awaiter(this, void 0, void 0, function* () {
            return node_fetch_1.default(utf8.encode(`${process.env.ZAKAZ_UA_API_URL}/stores/${store.externalId}/products/search/?q=${q}`), {
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
                    "x-chain": store.xChain,
                    "x-delivery-type": "undefined",
                    "x-version": "29"
                },
                "body": null,
                "method": "GET",
                //@ts-ignore
                "mode": "cors",
                "credentials": "include"
            })
                .then(res => res.json());
        });
    }
};
ZakazUaProvider.hasSearch = true;
ZakazUaProvider = ZakazUaProvider_1 = __decorate([
    common_1.Injectable()
], ZakazUaProvider);
exports.ZakazUaProvider = ZakazUaProvider;
//# sourceMappingURL=zakaz-ua.provider.js.map