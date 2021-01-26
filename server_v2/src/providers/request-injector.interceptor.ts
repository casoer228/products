import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { CrudRequest } from "@nestjsx/crud";
import { PARSED_CRUD_REQUEST_KEY } from '@nestjsx/crud/lib/constants'; 
import { Request } from 'express';

export type CoreCrudRequest = CrudRequest & { request: Pick<Request, "query" | "params"> } 

@Injectable()
export class RequestInjectorInterceptor implements NestInterceptor {
    
    intercept(context: ExecutionContext, next: CallHandler<any>) {
        const req = context.switchToHttp().getRequest<Request>();

        if(req[PARSED_CRUD_REQUEST_KEY]) {
            Object.assign(req[PARSED_CRUD_REQUEST_KEY], {
                request: {
                    params: req.params,
                    query: req.query,                   
                }
            })
        }
        return next.handle();
    }

}