"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_1 = require("@nestjs/typeorm");
const entities_1 = require("../entities");
const zakaz_ua_provider_1 = require("./zakaz-ua.provider");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
const typeorm_3 = require("typeorm");
const product_history_entity_1 = require("../entities/product-history.entity");
const Providers = [
    zakaz_ua_provider_1.ZakazUaProvider,
];
let ProductsService = class ProductsService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo, _moduleRef) {
        super(repo);
        this._moduleRef = _moduleRef;
    }
    getMany(req) {
        const _super = Object.create(null, {
            getMany: { get: () => super.getMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            let search = req.request.query.q;
            if (!search)
                search = process.env.BUCKWHEAT_SEARCH_STRING;
            if (search !== '*') {
                const searchIds = yield this.search(search);
                req.parsed.search.$and.push({
                    id: {
                        $in: searchIds
                    }
                });
            }
            return _super.getMany.call(this, req);
        });
    }
    search(q, productsRepository, productsHistoryRepository, producersRepository) {
        return __awaiter(this, void 0, void 0, function* () {
            const productsMap = yield productsRepository.find({
                relations: ['store']
            })
                .then(products => {
                const map = new Map();
                products.forEach((p) => {
                    map.set(this.getProductHash(p), p);
                });
                return map;
            });
            const producersMap = yield producersRepository.find()
                .then(producers => {
                const map = new Map();
                producers.forEach((p) => {
                    map.set(this.getProducerHash(p), p);
                });
                return map;
            });
            const storesMap = yield typeorm_2.getRepository(entities_1.Store).find()
                .then(stores => {
                const map = new Map();
                stores.forEach((p) => {
                    map.set(this.getStoreHash(p), p);
                });
                return map;
            });
            const currentDate = new Date();
            const providersProducts = yield Promise.all(Providers.map(t => this._moduleRef.get(t)).map(s => s.search(q))).then(res => res.reduce((acc, current) => [...acc, ...current], []));
            for (const providerProduct of providersProducts) {
                const producerHash = this.getProducerHash({
                    externalId: providerProduct.producer.externalId
                });
                const productHash = this.getProductHash({
                    externalId: providerProduct.externalId,
                    store: {
                        externalId: providerProduct.storeExternalId,
                    }
                });
                const storeHash = this.getStoreHash({
                    externalId: providerProduct.storeExternalId
                });
                if (!producersMap.get(producerHash)) {
                    if (!providerProduct.producer.name)
                        console.log(providerProduct);
                    const producer = yield producersRepository.save(Object.assign({}, providerProduct.producer));
                    producersMap.set(producerHash, producer);
                }
                if (!productsMap.get(productHash)) {
                    const product = yield productsRepository.save(Object.assign(Object.assign({}, providerProduct), { storeId: storesMap.get(storeHash).id }));
                    productsMap.set(productHash, product);
                }
                else {
                    yield productsRepository.update(productsMap.get(productHash).id, {
                        price: providerProduct.price,
                    });
                }
                yield productsHistoryRepository.save({
                    createdAt: currentDate,
                    productId: productsMap.get(productHash).id,
                    price: providerProduct.price
                });
            }
            return providersProducts.map(p => productsMap.get(this.getProductHash({
                externalId: p.externalId,
                store: {
                    externalId: p.storeExternalId,
                }
            })).id);
        });
    }
    getProductHash(product) {
        return `${product.externalId}-${product.store.externalId}`;
    }
    getProducerHash(producer) {
        return `${producer.externalId}`;
    }
    getStoreHash(store) {
        return `${store.externalId}`;
    }
};
__decorate([
    typeorm_3.Transaction(),
    __param(1, typeorm_2.TransactionRepository(entities_1.Product)),
    __param(2, typeorm_2.TransactionRepository(product_history_entity_1.ProductHistory)),
    __param(3, typeorm_2.TransactionRepository(entities_1.Producer)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository]),
    __metadata("design:returntype", Promise)
], ProductsService.prototype, "search", null);
ProductsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(entities_1.Product)),
    __metadata("design:paramtypes", [Object, core_1.ModuleRef])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map