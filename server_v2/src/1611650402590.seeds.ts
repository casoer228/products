import {DeepPartial, getManager, getRepository, MigrationInterface, QueryRunner} from "typeorm";
import { Provider } from "./entities/provider.entity";
import { Store } from "./entities/store.entity";
import { ZakazUaProvider } from "./providers/zakaz-ua.provider";



const providers: Array<DeepPartial<Provider>> = [{
    id: ZakazUaProvider.id,
    name: "ZakazUA",
    stores: [{
        title: "МегаМаркет",
        iconUrl: "https://img4.zakaz.ua/store_logos/megamarket.svg",
        externalId: "48267601",
        xChain: "megamarket"
    }, {
        title: "CityMarket",
        iconUrl: "https://img4.zakaz.ua/store_logos/citymarket.svg",
        externalId: "48250029",
        xChain: "citymarket"
    }, {
        title: "Фуршет",
        iconUrl: "https://img4.zakaz.ua/store_logos/furshet.svg",
        externalId: "48215518",
        xChain: "furshet"
    }, {
        title: "Ашан",  
        iconUrl: "https://img4.zakaz.ua/store_logos/auchan.svg",
        externalId: "48246401",
        xChain: "auchan"
    }, {
        title: "Novus",
        iconUrl: "https://img4.zakaz.ua/store_logos/novus.svg",
        externalId: "48201070",
        xChain: "novus"
    }, {
        title: "Varus",
        iconUrl: "https://img4.zakaz.ua/store_logos/varus.svg",
        externalId: "48241001",
        xChain: "varus"
    }, {
        title: "Metro",
        iconUrl: "https://img4.zakaz.ua/store_logos/metro.svg",
        externalId: "48215611",
        xChain: "metro"
    }, {
        title: "EKO Маркет",
        iconUrl: "https://img4.zakaz.ua/store_logos/ekomarket.svg",
        externalId: '48280214',
        xChain: "ekomarket"
    }]
}] 


export class Seeds1611650402590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const stores = getRepository(Store)

        await getManager().transaction(async (manager) => {
            for(const provider of providers) {
                const stores = provider.stores;
                delete provider.stores;
                const _provider = await manager.save(getRepository(Provider).create(provider));
                await manager.save(stores.map(e => getRepository(Store).create({ ...e, providerId: _provider.id })));
            }
        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
