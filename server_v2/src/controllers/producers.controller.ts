import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController } from "@nestjsx/crud";
import { Producer } from "../entities";
import { ProducersService } from "../providers";

@Crud({
    model: {
        type: Producer
    },
    routes: {
        only: ['getManyBase']
    },
    query: {
        alwaysPaginate: true
    }
})
@Controller('/producers')
@ApiTags('Producers')
export class ProducersController implements CrudController<Producer> {
    constructor(public readonly service: ProducersService) { }
}