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
exports.PositionHistory = void 0;
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const position_entity_1 = require("./position.entity");
const { CREATE } = crud_1.CrudValidationGroups;
let PositionHistory = class PositionHistory {
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
], PositionHistory.prototype, "id", void 0);
__decorate([
    swagger_1.ApiProperty({ type: position_entity_1.Position }),
    typeorm_1.ManyToOne(() => position_entity_1.Position, p => p.history),
    __metadata("design:type", position_entity_1.Position)
], PositionHistory.prototype, "position", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PositionHistory.prototype, "positionId", void 0);
__decorate([
    swagger_1.ApiProperty({
        readOnly: true,
    })
    // @CreateDateColumn()
    ,
    typeorm_1.Column({ type: 'date', nullable: true }),
    __metadata("design:type", Date)
], PositionHistory.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], PositionHistory.prototype, "price", void 0);
PositionHistory = __decorate([
    typeorm_1.Entity('positions-history')
], PositionHistory);
exports.PositionHistory = PositionHistory;
//# sourceMappingURL=position-history.entity.js.map