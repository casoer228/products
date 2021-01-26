import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { Producer } from "../entities";

@Injectable()
export class ProducersService extends TypeOrmCrudService<Producer> {
    constructor(@InjectRepository(Producer) repo) { super(repo) }
}