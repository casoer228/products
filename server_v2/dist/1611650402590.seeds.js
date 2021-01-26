"use strict";
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
exports.Seeds1611650402590 = void 0;
const typeorm_1 = require("typeorm");
const product_history_entity_1 = require("./entities/product-history.entity");
const provider_entity_1 = require("./entities/provider.entity");
const store_entity_1 = require("./entities/store.entity");
const zakaz_ua_provider_1 = require("./providers/zakaz-ua.provider");
const providers = [{
        id: zakaz_ua_provider_1.ZakazUaProvider.id,
        name: "ZakazUA",
        stores: [{
                title: "МегаМаркет",
                iconUrl: "https://img4.zakaz.ua/store_logos/megamarket.svg",
                externalId: "48267601",
                xChain: "megamarket"
            }, {
                title: "CityMarket",
                iconUrl: "https://img4.zakaz.ua/store_logos/citymarket.svg",
                externalId: "48250029",
                xChain: "citymarket"
            }, {
                title: "Фуршет",
                iconUrl: "https://img4.zakaz.ua/store_logos/furshet.svg",
                externalId: "48215518",
                xChain: "furshet"
            }, {
                title: "Ашан",
                iconUrl: "https://img4.zakaz.ua/store_logos/auchan.svg",
                externalId: "48246401",
                xChain: "auchan"
            }, {
                title: "Novus",
                iconUrl: "https://img4.zakaz.ua/store_logos/novus.svg",
                externalId: "48201070",
                xChain: "novus"
            }, {
                title: "Varus",
                iconUrl: "https://img4.zakaz.ua/store_logos/varus.svg",
                externalId: "48241001",
                xChain: "varus"
            }, {
                title: "Metro",
                iconUrl: "https://img4.zakaz.ua/store_logos/metro.svg",
                externalId: "48215611",
                xChain: "metro"
            }, {
                title: "EKO Маркет",
                iconUrl: "https://img4.zakaz.ua/store_logos/ekomarket.svg",
                externalId: '48280214',
                xChain: "ekomarket"
            }]
    }];
const priceHistory = {
    "01.03.2017": 3186,
    "01.04.2017": 3157,
    "01.05.2017": 3106,
    "01.06.2017": 3163,
    "01.07.2017": 3141,
    "01.08.2017": 3116,
    "01.09.2017": 3042,
    "01.10.2017": 2843,
    "01.11.2017": 2573,
    "01.12.2017": 2197,
    "01.01.2018": 2300,
    "01.02.2018": 2319,
    "01.03.2018": 2195,
    "01.04.2018": 2100,
    "01.05.2018": 1846,
    "01.06.2018": 1769,
    "01.07.2018": 1849,
    "01.08.2018": 1775,
    "01.09.2018": 1698,
    "01.10.2018": 1767,
    "01.11.2018": 1715,
    "01.12.2018": 1710,
    "01.01.2019": 1707,
    "01.02.2019": 1730,
    "01.03.2019": 1756,
    "01.05.2019": 1706,
    "01.06.2019": 1673,
    "01.07.2019": 1684,
    "01.08.2019": 1762,
    "01.09.2019": 2099,
    "01.10.2019": 2809,
    "01.11.2019": 2825,
    "01.12.2019": 2756,
    "01.01.2020": 3020,
    "01.02.2020": 3019,
    "01.03.2020": 3303,
    "01.04.2020": 4271,
    "01.05.2020": 4049,
    "01.06.2020": 4207,
    "01.07.2020": 4173,
    "01.08.2020": 4048,
    "01.09.2020": 4034,
    "01.10.2020": 3998,
    "01.11.2020": 4000,
    "01.12.2020": 3934,
    "01.01.2021": 4000,
    "01.04.2019": 1735
};
class Seeds1611650402590 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield typeorm_1.getManager().transaction((manager) => __awaiter(this, void 0, void 0, function* () {
                for (const provider of providers) {
                    const stores = provider.stores;
                    delete provider.stores;
                    const _provider = yield manager.save(typeorm_1.getRepository(provider_entity_1.Provider).create(provider));
                    yield manager.save(stores.map(e => typeorm_1.getRepository(store_entity_1.Store).create(Object.assign(Object.assign({}, e), { providerId: _provider.id }))));
                    yield manager.save(typeorm_1.getRepository(product_history_entity_1.ProductHistory).create(Object.entries(priceHistory).map(([date, price]) => ({ createdAt: new Date(date), price, }))));
                }
            }));
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.Seeds1611650402590 = Seeds1611650402590;
//# sourceMappingURL=1611650402590.seeds.js.map