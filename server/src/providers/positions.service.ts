import { ModuleRef } from "@nestjs/core";
import { Cron } from "@nestjs/schedule";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCrudService } from "@nestjsx/crud-typeorm";
import { getRepository, Repository, Transaction, TransactionRepository } from "typeorm";
import { Position, PositionHistory } from "../entities";
import { IPositionProvider, IPullResultItem } from "./abstract/position-provider.interface";
import { ZakazUaPositionsProvider } from "./zakaz-ua.position-provider";
import * as _ from 'lodash';
import { CrudRequest, GetManyDefaultResponse } from "@nestjsx/crud";
import { CoreCrudRequest } from "./request-injectior.interceptor";
import { Injectable } from "@nestjs/common";

enum PositionProvider {
    ZakazUa = 'zakaz_ua',
}

interface ClassOf<T> {
    new(...args: any[]): T;
}

interface IHasSearch {
    search(q: string): Promise<Array<IPullResultItem>>;
}

type PositionProviderType =
    ({ hasSearch: true } & ClassOf<IPositionProvider & IHasSearch>) |
    (ClassOf<IPositionProvider> & { hasSearch?: false | undefined })

const PositionProviders: {
    [key in PositionProvider]: PositionProviderType
} = {
    [PositionProvider.ZakazUa]: ZakazUaPositionsProvider,
}

type GetManyQuery = {
    pullBefore?: boolean;

} 

@Injectable()
export class PositionsService extends TypeOrmCrudService<Position> {

    constructor(
        @InjectRepository(Position) repo: Repository<Position>,
        private readonly _moduleRef: ModuleRef
    ) {
        super(repo);
    }

    @Cron("*/10 * * * *")
    @Transaction()
    async pull(
        @TransactionRepository(Position) positionsRepository?: Repository<Position>,
        @TransactionRepository(PositionHistory) positionsHistoryRepository?: Repository<PositionHistory>,
    ) {

        const date = new Date();

        const positions = await getRepository(Position)
            .find({
                select: ["id", "providerPositionId", "provider"]
            })
            .then(p => _.groupBy(p, (p) => this.getPositionHashCode(p)));

        const res = await Promise.all(
            Object.entries(PositionProviders)
                .map(([providerName, providerType]) => {
                    const providerInstance = this._moduleRef.get<IPositionProvider>(providerType);
                    return providerInstance.pull().then(r => r.map(p => ({ ...p, provider: providerName })))
                })
        )

        for (const data of res) {

            for (const pullResponse of data) {

                let position = positions[this.getPositionHashCode({
                    provider: pullResponse.provider,
                    providerPositionId: pullResponse.externalId
                })]?.[0];

                if (!position)
                    position = await positionsRepository.save({
                        imageUrl: pullResponse.imageUrl,
                        provider: pullResponse.provider,
                        providerPositionId: pullResponse.externalId,
                        title: pullResponse.title,
                        webUrl: pullResponse.webUrl,
                        price: pullResponse.price,
                    })
                else 
                    positionsRepository.update(position.id, {
                        price: pullResponse.price, 
                    })

                positionsHistoryRepository.insert({
                    positionId: position.id,
                    price: pullResponse.price,
                    createdAt: date,
                })

            }
        }
    }

    //@ts-ignore
    async getMany(req: CoreCrudRequest) {
        if(req.request.query.pullBefore) 
            await this.pull();
        if(req.request.query.q) 
            return this.search(req.request.query.q as string);
        return super.getMany(req);
    }

    search(q: string): Promise<Array<IPullResultItem>> {
        return Promise.all(this.getSearchablePositionProviderInstances().map(p => p.search(q)))
            .then(res => res.reduce((acc, current) => [...acc, ...current], []))
    }

    private getPositionHashCode(position: Pick<Position, 'provider' | 'providerPositionId'>) {
        return `${position.provider}-${position.providerPositionId}`;
    }

    private getSearchablePositionProviderInstances(): Array<IHasSearch & IPositionProvider> {
        //@ts-ignore
        return Object.values(PositionProviders).filter(t => t.hasSearch).map(t => this._moduleRef.get<IHasSearch & IPositionProvider>(t))
    }

}