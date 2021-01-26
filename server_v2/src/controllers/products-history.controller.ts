import { Controller } from "@nestjs/common";
import { Crud, CrudController } from "@nestjsx/crud";
import { ProductHistory } from "../entities/product-history.entity";
import { ProductsHistoryService } from "../providers/products-history.service";

@Crud({
    model: {
        type: ProductHistory,
    },
    query: {
        alwaysPaginate: true
    },
    routes: {
        only: ['getManyBase']
    }
})
@Controller('/products-history')
export class ProductsHistoryController implements CrudController<ProductHistory> {
    constructor(public readonly service: ProductsHistoryService) { }
}