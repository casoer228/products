"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestInjectorInterceptor = void 0;
const common_1 = require("@nestjs/common");
const constants_1 = require("@nestjsx/crud/lib/constants");
let RequestInjectorInterceptor = class RequestInjectorInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        if (req[constants_1.PARSED_CRUD_REQUEST_KEY]) {
            Object.assign(req[constants_1.PARSED_CRUD_REQUEST_KEY], {
                request: {
                    params: req.params,
                    query: req.query,
                }
            });
        }
        return next.handle();
    }
};
RequestInjectorInterceptor = __decorate([
    common_1.Injectable()
], RequestInjectorInterceptor);
exports.RequestInjectorInterceptor = RequestInjectorInterceptor;
//# sourceMappingURL=request-injector.interceptor.js.map