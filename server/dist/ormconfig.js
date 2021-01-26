"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_naming_strategies_1 = require("typeorm-naming-strategies");
const dotenv = require("dotenv");
const path_1 = require("path");
dotenv.config();
const env = process.env;
/**
 * we use defaults values for loccal (development) envirionment
 * in production should use system env variables
 * the problem for local usage .env file is typeorm specific loaded this file and this comand is not triggered dotenv.config()
 *
 * IMPORTANT: DONT CHANGE LOCATIONS IN package.json (it will not work)!!!!
 */
const watch = (process.argv || []).some(i => i.includes('watch'));
module.exports = {
    type: env.TYPEORM_CONNECTION || "postgres",
    host: env.TYPEORM_HOST,
    port: env.TYPEORM_PORT,
    username: env.TYPEORM_USERNAME || 'postgres',
    password: env.TYPEORM_PASSWORD || 'postgres',
    database: env.TYPEORM_DATABASE || 'identity',
    logging: env.TYPEORM_LOGGING != false,
    synchronize: !watch && env.TYPEORM_MIGRATIONS_RUN != true,
    migrationsRun: !watch && env.TYPEORM_MIGRATIONS_RUN != true,
    debug: env.TYPEORM_DEBUG != true,
    entities: [path_1.join(__dirname, "./entities/*.entity{.ts,.js}")],
    migrationsTableName: "orm_migrations",
    migrations: [path_1.join(__dirname, "./seeds{.ts,.js}")],
    namingStrategy: new typeorm_naming_strategies_1.SnakeNamingStrategy(),
};
//# sourceMappingURL=ormconfig.js.map