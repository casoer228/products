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
exports.PositionsService = void 0;
const core_1 = require("@nestjs/core");
const schedule_1 = require("@nestjs/schedule");
const typeorm_1 = require("@nestjs/typeorm");
const crud_typeorm_1 = require("@nestjsx/crud-typeorm");
const typeorm_2 = require("typeorm");
const entities_1 = require("../entities");
const zakaz_ua_position_provider_1 = require("./zakaz-ua.position-provider");
const _ = require("lodash");
const common_1 = require("@nestjs/common");
var PositionProvider;
(function (PositionProvider) {
    PositionProvider["ZakazUa"] = "zakaz_ua";
})(PositionProvider || (PositionProvider = {}));
const PositionProviders = {
    [PositionProvider.ZakazUa]: zakaz_ua_position_provider_1.ZakazUaPositionsProvider,
};
let PositionsService = class PositionsService extends crud_typeorm_1.TypeOrmCrudService {
    constructor(repo, _moduleRef) {
        super(repo);
        this._moduleRef = _moduleRef;
    }
    pull(positionsRepository, positionsHistoryRepository) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const date = new Date();
            const positions = yield typeorm_2.getRepository(entities_1.Position)
                .find({
                select: ["id", "providerPositionId", "provider"]
            })
                .then(p => _.groupBy(p, (p) => this.getPositionHashCode(p)));
            const res = yield Promise.all(Object.entries(PositionProviders)
                .map(([providerName, providerType]) => {
                const providerInstance = this._moduleRef.get(providerType);
                return providerInstance.pull().then(r => r.map(p => (Object.assign(Object.assign({}, p), { provider: providerName }))));
            }));
            for (const data of res) {
                for (const pullResponse of data) {
                    let position = (_a = positions[this.getPositionHashCode({
                        provider: pullResponse.provider,
                        providerPositionId: pullResponse.externalId
                    })]) === null || _a === void 0 ? void 0 : _a[0];
                    if (!position)
                        position = yield positionsRepository.save({
                            imageUrl: pullResponse.imageUrl,
                            provider: pullResponse.provider,
                            providerPositionId: pullResponse.externalId,
                            title: pullResponse.title,
                            webUrl: pullResponse.webUrl,
                            price: pullResponse.price,
                        });
                    else
                        positionsRepository.update(position.id, {
                            price: pullResponse.price,
                        });
                    positionsHistoryRepository.insert({
                        positionId: position.id,
                        price: pullResponse.price,
                        createdAt: date,
                    });
                }
            }
        });
    }
    //@ts-ignore
    getMany(req) {
        const _super = Object.create(null, {
            getMany: { get: () => super.getMany }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (req.request.query.pullBefore)
                yield this.pull();
            if (req.request.query.q)
                return this.search(req.request.query.q);
            return _super.getMany.call(this, req);
        });
    }
    search(q) {
        return Promise.all(this.getSearchablePositionProviderInstances().map(p => p.search(q)))
            .then(res => res.reduce((acc, current) => [...acc, ...current], []));
    }
    getPositionHashCode(position) {
        return `${position.provider}-${position.providerPositionId}`;
    }
    getSearchablePositionProviderInstances() {
        //@ts-ignore
        return Object.values(PositionProviders).filter(t => t.hasSearch).map(t => this._moduleRef.get(t));
    }
};
__decorate([
    schedule_1.Cron("*/10 * * * *"),
    typeorm_2.Transaction(),
    __param(0, typeorm_2.TransactionRepository(entities_1.Position)),
    __param(1, typeorm_2.TransactionRepository(entities_1.PositionHistory)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository]),
    __metadata("design:returntype", Promise)
], PositionsService.prototype, "pull", null);
PositionsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(entities_1.Position)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        core_1.ModuleRef])
], PositionsService);
exports.PositionsService = PositionsService;
//# sourceMappingURL=positions.service.js.map