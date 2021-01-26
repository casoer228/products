import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Store } from "../entities";

@Injectable()
export class StoresService extends TypeOrmCrudService<Store> {
    constructor(@InjectRepository(Store) repo) { super(repo) }
}