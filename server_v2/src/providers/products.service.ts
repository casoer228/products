import { Injectable } from "@nestjs/common";
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Producer, Product, Store } from "../entities";
import { IProviderService } from "./abstract/provider-service.interface";
import { ZakazUaProvider } from "./zakaz-ua.provider";
import { CoreCrudRequest } from "./request-injector.interceptor";
import { DeepPartial, getRepository, Repository, TransactionRepository } from "typeorm";
import { ModuleRef } from "@nestjs/core";
import { Transaction } from "typeorm";
import { ProductHistory } from "../entities/product-history.entity";

interface ClassOf<T> {
    new(...args: any[]): T;
}
interface ProducerType extends ClassOf<IProviderService> {
    readonly id: string;
}
const Providers: Array<ProducerType> = [
    ZakazUaProvider,
]

@Injectable()
export class ProductsService extends TypeOrmCrudService<Product> {

    constructor(
        @InjectRepository(Product) repo,
        private readonly _moduleRef: ModuleRef,
    ) { super(repo) }

    async getMany(
        req: CoreCrudRequest,
    ) {
        let search = req.request.query.q;
        if (!search)
            search = process.env.BUCKWHEAT_SEARCH_STRING;
        if (search !== '*') {
            const searchIds = await this.search(search as string);
            req.parsed.search.$and.push({
                id: {
                    $in: searchIds
                }
            })
        }
        return super.getMany(req);
    }

    @Transaction()
    private async search(
        q: string,
        @TransactionRepository(Product)
        productsRepository?: Repository<Product>,
        @TransactionRepository(ProductHistory)
        productsHistoryRepository?: Repository<ProductHistory>,
        @TransactionRepository(Producer)
        producersRepository?: Repository<Producer>
    ): Promise<Array<number>> {

        const productsMap: Map<string, Product> = await productsRepository.find({
            relations: ['store']
        })
            .then(products => {
                const map = new Map();
                products.forEach((p) => {
                    map.set(this.getProductHash(p), p);
                })
                return map;
            })

        const producersMap: Map<string, Producer> = await producersRepository.find()
            .then(producers => {
                const map = new Map();
                producers.forEach((p) => {
                    map.set(this.getProducerHash(p), p);
                })
                return map;
            })

        const storesMap: Map<string, Store> = await getRepository(Store).find()
            .then(stores => {
                const map = new Map();
                stores.forEach((p) => {
                    map.set(this.getStoreHash(p), p);
                })
                return map;
            })

        const currentDate = new Date();
        const providersProducts = await Promise.all(Providers.map(t => this._moduleRef.get<IProviderService>(t)).map(s => s.search(q))).then(res => res.reduce((acc, current) => [...acc, ...current], []));
        for (const providerProduct of providersProducts) {

            const producerHash = this.getProducerHash({
                externalId: providerProduct.producer.externalId
            })

            const productHash = this.getProductHash({
                externalId: providerProduct.externalId,
                store: {
                    externalId: providerProduct.storeExternalId,
                }
            })

            const storeHash = this.getStoreHash({
                externalId: providerProduct.storeExternalId
            })

            if (!producersMap.get(producerHash)) {
                if(!providerProduct.producer.name)
                    console.log(providerProduct)
                const producer = await producersRepository.save({ ...providerProduct.producer });
                producersMap.set(producerHash, producer);
            }

            if (!productsMap.get(productHash)) {
                const product = await productsRepository.save({ ...providerProduct, storeId: storesMap.get(storeHash).id });
                productsMap.set(productHash, product);
            } else {
                await productsRepository.update(productsMap.get(productHash).id, {
                    price: providerProduct.price,
                })
            }

            // await productsHistoryRepository.save({
            //     createdAt: currentDate,
            //     productId: productsMap.get(productHash).id,
            //     price: providerProduct.price
            // })

        }

        return providersProducts.map(p => productsMap.get(this.getProductHash({
            externalId: p.externalId,
            store: {
                externalId: p.storeExternalId,
            }
        })).id)

    }

    private getProductHash(product: DeepPartial<Product>) {
        return `${product.externalId}-${product.store.externalId}`;
    }

    private getProducerHash(producer: Partial<Producer>) {
        return `${producer.externalId}`;
    }

    private getStoreHash(store: Partial<Store>) {
        return `${store.externalId}`
    }

}