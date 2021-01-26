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
exports.Position = void 0;
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const position_history_entity_1 = require("./position-history.entity");
const { CREATE } = crud_1.CrudValidationGroups;
let Position = class Position {
};
__decorate([
    swagger_1.ApiProperty({
        readOnly: true,
    }),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    class_validator_1.IsEmpty({ groups: [CREATE] }),
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Position.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Position.prototype, "title", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Position.prototype, "provider", void 0);
__decorate([
    swagger_1.ApiProperty({
        readOnly: true,
    }),
    class_validator_1.IsNumber(),
    class_validator_1.IsPositive(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Position.prototype, "providerPositionId", void 0);
__decorate([
    swagger_1.ApiProperty({
        type: position_history_entity_1.PositionHistory,
        isArray: true,
        readOnly: true,
    }),
    typeorm_1.OneToMany(() => position_history_entity_1.PositionHistory, p => p.position),
    __metadata("design:type", Array)
], Position.prototype, "history", void 0);
__decorate([
    swagger_1.ApiProperty({
        readOnly: true
    }),
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Position.prototype, "price", void 0);
__decorate([
    swagger_1.ApiProperty(),
    class_validator_1.IsUrl(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Position.prototype, "imageUrl", void 0);
__decorate([
    swagger_1.ApiProperty({ readOnly: true }),
    class_validator_1.IsString(),
    typeorm_1.Column(),
    __metadata("design:type", String)
], Position.prototype, "webUrl", void 0);
Position = __decorate([
    typeorm_1.Entity("positions")
], Position);
exports.Position = Position;
//# sourceMappingURL=position.entity.js.map