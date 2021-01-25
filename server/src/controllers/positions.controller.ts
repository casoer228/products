import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
import { Position } from "../entities";
import { PositionsService } from "../providers/positions.service";

@Crud({
    model: {
        type: Position
    },
    query: {
        alwaysPaginate: true,
    },
    routes: {
        only: ['getManyBase']
    }
})
@Controller('/positions')
@ApiTags('Positions')
//@ts-ignore
export class PositionsController implements CrudController<Position> {

    constructor(public service: PositionsService) { }

}