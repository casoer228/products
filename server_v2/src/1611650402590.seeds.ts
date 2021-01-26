import { DeepPartial, getManager, getRepository, MigrationInterface, QueryRunner } from "typeorm";
import { ProductHistory } from "./entities/product-history.entity";
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
//https://index.minfin.com.ua/ua/markets/wares/prods/?c=%D0%B1%D0%B0%D0%BA%D0%B0%D0%BB%D0%B5%D1%8F&g=%D0%BA%D1%80%D1%83%D0%BF%D1%8B&w=%D0%B3%D1%80%D0%B5%D1%87%D0%BA%D0%B0
const priceHistory = {
    "01.03.2017": 3186,
    "01.04.2017": 3157,
    "01.05.2017": 3106,
    "01.06.2017": 3163,
    "01.07.2017": 3141,
    "01.08.2017": 3116,
    "01.09.2017": 3042,
    "01.10.2017": 2843,
    "01.11.2017": 2573,
    "01.12.2017": 2197,
    "01.01.2018": 2300,
    "01.02.2018": 2319,
    "01.03.2018": 2195,
    "01.04.2018": 2100,
    "01.05.2018": 1846,
    "01.06.2018": 1769,
    "01.07.2018": 1849,
    "01.08.2018": 1775,
    "01.09.2018": 1698,
    "01.10.2018": 1767,
    "01.11.2018": 1715,
    "01.12.2018": 1710,
    "01.01.2019": 1707,
    "01.02.2019": 1730,
    "01.03.2019": 1756,
    "01.05.2019": 1706,
    "01.06.2019": 1673,
    "01.07.2019": 1684,
    "01.08.2019": 1762,
    "01.09.2019": 2099,
    "01.10.2019": 2809,
    "01.11.2019": 2825,
    "01.12.2019": 2756,
    "01.01.2020": 3020,
    "01.02.2020": 3019,
    "01.03.2020": 3303,
    "01.04.2020": 4271,
    "01.05.2020": 4049,
    "01.06.2020": 4207,
    "01.07.2020": 4173,
    "01.08.2020": 4048,
    "01.09.2020": 4034,
    "01.10.2020": 3998,
    "01.11.2020": 4000,
    "01.12.2020": 3934,
    "01.01.2021": 4000,
    "01.04.2019": 1735
}
export class Seeds1611650402590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await getManager().transaction(async (manager) => {
            for (const provider of providers) {
                const stores = provider.stores;
                delete provider.stores;
                const _provider = await manager.save(getRepository(Provider).create(provider));
                await manager.save(stores.map(e => getRepository(Store).create({ ...e, providerId: _provider.id })));
                await manager.save(getRepository(ProductHistory).create(Object.entries(priceHistory).map(([date, price]) => ({ createdAt: new Date(date), price, }) )))
            }

        })
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
