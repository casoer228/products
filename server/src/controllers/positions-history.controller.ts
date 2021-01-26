import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { PositionHistory } from "../entities";
import { PositionsHistoryService } from "../providers";

@Crud({
    model: {
        type: PositionHistory
    },
    query: {
        alwaysPaginate: true,
    },
    routes: {
        only: ['getManyBase']
    }
})
@Controller('positions-history')
@ApiTags('Positions History')
export class PositionsHistoryController implements CrudController<PositionHistory> {
    constructor(public service: PositionsHistoryService) { }
}