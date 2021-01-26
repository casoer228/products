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
exports.PositionsHistoryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const entities_1 = require("../entities");
const providers_1 = require("../providers");
let PositionsHistoryController = class PositionsHistoryController {
    constructor(service) {
        this.service = service;
    }
};
PositionsHistoryController = __decorate([
    crud_1.Crud({
        model: {
            type: entities_1.PositionHistory
        },
        query: {
            alwaysPaginate: true,
        },
        routes: {
            only: ['getManyBase']
        }
    }),
    common_1.Controller('positions-history'),
    swagger_1.ApiTags('Positions History'),
    __metadata("design:paramtypes", [providers_1.PositionsHistoryService])
], PositionsHistoryController);
exports.PositionsHistoryController = PositionsHistoryController;
//# sourceMappingURL=positions-history.controller.js.map