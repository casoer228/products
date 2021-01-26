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
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const dotenv = require("dotenv");
const crud_1 = require("@nestjsx/crud");
const swagger_1 = require("@nestjs/swagger");
const providers_1 = require("./providers");
var NodeEnv;
(function (NodeEnv) {
    NodeEnv["Production"] = "production";
})(NodeEnv || (NodeEnv = {}));
const swagger = 'swagger';
function bootstrap() {
    return __awaiter(this, void 0, void 0, function* () {
        if (process.env.NODE_ENV + NodeEnv.Production)
            dotenv.config();
        const app = yield core_1.NestFactory.create(app_module_1.AppModule);
        app.setGlobalPrefix('api/v1');
        app.useGlobalInterceptors(new crud_1.CrudRequestInterceptor());
        app.useGlobalInterceptors(new providers_1.RequestInjectorInterceptor());
        console.log('app starting...');
        const options = new swagger_1.DocumentBuilder()
            .setTitle('@nestjsx/crud-typeorm')
            .setDescription('@nestjsx/crud-typeorm')
            .setVersion('1.0')
            .build();
        const document = swagger_1.SwaggerModule.createDocument(app, options);
        swagger_1.SwaggerModule.setup(swagger, app, document, { customJs: 'extension.js' });
        yield app.listen(process.env.SERVER_PORT || 3030);
        console.log('app started');
    });
}
bootstrap();
//# sourceMappingURL=main.js.map