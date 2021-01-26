import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { Store } from "../entities";
import { StoresService } from "../providers";

@Crud({
    model: {
        type: Store
    },
    query: {
        alwaysPaginate: true
    },
    routes: {
        only: ['getManyBase']
    }
})
@Controller('/stores')
export class StoresController implements CrudController<Store> {
    constructor(public readonly service: StoresService) { }
}