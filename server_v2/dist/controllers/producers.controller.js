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
exports.ProducersController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const crud_1 = require("@nestjsx/crud");
const entities_1 = require("../entities");
const providers_1 = require("../providers");
let ProducersController = class ProducersController {
    constructor(service) {
        this.service = service;
    }
};
ProducersController = __decorate([
    crud_1.Crud({
        model: {
            type: entities_1.Producer
        },
        routes: {
            only: ['getManyBase']
        },
        query: {
            alwaysPaginate: true
        }
    }),
    common_1.Controller('/producers'),
    swagger_1.ApiTags('Producers'),
    __metadata("design:paramtypes", [providers_1.ProducersService])
], ProducersController);
exports.ProducersController = ProducersController;
//# sourceMappingURL=producers.controller.js.map