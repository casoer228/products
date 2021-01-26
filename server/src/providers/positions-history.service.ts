import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { PositionHistory } from "../entities";

@Injectable()
export class PositionsHistoryService extends TypeOrmCrudService<PositionHistory> {
    constructor(@InjectRepository(PositionHistory) repo) { super(repo) }
}