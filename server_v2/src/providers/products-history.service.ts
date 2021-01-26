import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { ProductHistory } from "../entities/product-history.entity";

@Injectable()
export class ProductsHistoryService extends TypeOrmCrudService<ProductHistory> {
  constructor(@InjectRepository(ProductHistory) repo) { super(repo )}  
} 