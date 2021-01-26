import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Crud, CrudController, CrudRequest, Override, ParsedRequest } from "@nestjsx/crud";
import { Product } from "../entities";
import { ProductsService } from "../providers";



@Crud({
    model: {
        type: Product
    },
    routes: {
        only: ['getManyBase']
    },
    query: {
        alwaysPaginate: true,
    }
})
@Controller('/products')
@ApiTags('Products')
export class ProductsController implements CrudController<Product> {
    constructor(public readonly service: ProductsService) {}
}