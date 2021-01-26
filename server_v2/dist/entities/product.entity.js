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
exports.Product = exports.Unit = exports.Currency = void 0;
const typeorm_1 = require("typeorm");
const store_entity_1 = require("./store.entity");
var Currency;
(function (Currency) {
    Currency["UAH"] = "uah";
})(Currency = exports.Currency || (exports.Currency = {}));
var Unit;
(function (Unit) {
    Unit["Kilogram"] = "gr";
    Unit["Gram"] = "kg";
    Unit["Pieces"] = "pcs";
})(Unit = exports.Unit || (exports.Unit = {}));
let Product = class Product {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Product.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "externalId", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "float", nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "weight", void 0);
__decorate([
    typeorm_1.Column({ enum: Unit, type: 'enum' }),
    __metadata("design:type", String)
], Product.prototype, "unit", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", Number)
], Product.prototype, "count", void 0);
__decorate([
    typeorm_1.ManyToOne(() => store_entity_1.Store, i => i.products),
    __metadata("design:type", store_entity_1.Store)
], Product.prototype, "store", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "storeId", void 0);
__decorate([
    typeorm_1.Column({ enum: Currency, type: 'enum' }),
    __metadata("design:type", String)
], Product.prototype, "currency", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typeorm_1.Column({ nullable: true }),
    __metadata("design:type", String)
], Product.prototype, "imageURL", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "webURL", void 0);
Product = __decorate([
    typeorm_1.Entity()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.entity.js.map