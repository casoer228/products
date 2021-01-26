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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Store = void 0;
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const provider_entity_1 = require("./provider.entity");
let Store = class Store {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Store.prototype, "externalId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Store.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Store.prototype, "iconUrl", void 0);
__decorate([
    typeorm_1.ManyToOne(() => provider_entity_1.Provider, i => i.stores),
    __metadata("design:type", provider_entity_1.Provider)
], Store.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Store.prototype, "providerId", void 0);
__decorate([
    typeorm_1.OneToMany(() => product_entity_1.Product, i => i.store),
    __metadata("design:type", Array)
], Store.prototype, "products", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Store.prototype, "xChain", void 0);
Store = __decorate([
    typeorm_1.Entity()
], Store);
exports.Store = Store;
//# sourceMappingURL=store.entity.js.map