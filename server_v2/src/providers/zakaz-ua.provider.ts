import fetch from "node-fetch";
import { Injectable } from "@nestjs/common";
import * as utf8 from 'utf8';
import { IProviderService, ISearchResult } from "./abstract/provider-service.interface";
import { Currency, Store, Unit } from "../entities";
import { getRepository } from "typeorm";


export interface PriceWholesale {
    min_qty: number;
    price: number;
}

export interface Discount {
    status: boolean;
    value: number;
    old_price: number;
    due_date?: any;
}

export interface Quantity {
    min: number;
    step: number;
    is_strict: boolean;
}

export interface NutritionFacts {
    ingredient_energy: string;
    ingredient_protein: string;
    ingredient_fat: string;
    ingredient_carbohydrates: string;
}

export interface Restrictions {
    in_sell_from: string;
    prohibited_payment_methods: any[];
    available_for_delivery_services: string[];
}

export interface Logo {
    s32x32: string;
    s16x16: string;
    s64x64: string;
}

export interface Producer {
    trademark: string;
    trademark_slug: string;
    website: string;
    logo: Logo;
    name: string;
}

export interface Img {
    s150x150: string;
    s200x200: string;
    s350x350: string;
    s1350x1350: string;
}

export interface Gallery {
    s150x150: string;
    s200x200: string;
    s350x350: string;
    s1350x1350: string;
}

export interface Result {
    ean: string;
    sku: string;
    title: string;
    price: number;
    price_wholesale: PriceWholesale[];
    discount: Discount;
    bundle: number;
    unit: string;
    volume?: any;
    quantity: Quantity;
    currency: string;
    category_id: string;
    parent_category_id: string;
    description: string;
    nutrition_facts: NutritionFacts;
    slug: string;
    in_stock: boolean;
    is_hit: boolean;
    is_alcohol: boolean;
    is_nicotine: boolean;
    is_ready_meal: boolean;
    is_new_product: boolean;
    horeca_only: boolean;
    excisable: boolean;
    web_url: string;
    restrictions: Restrictions;
    ingredients: any[];
    fat?: any;
    shelf_life: string;
    temperature_range: string;
    pack_amount?: any;
    country: string;
    producer: Producer;
    custom_ribbons: any[];
    img: Img;
    gallery: Gallery[];
    weight: number;
    has_similar_products?: any;
}

export interface Category {
    id: string;
    title: string;
    count: number;
    children: any[];
}

export interface Option {
    name: string;
    count: number;
    query: string;
}

export interface Filter {
    type: string;
    name: string;
    options: Option[];
}

export interface RootObject {
    count: number;
    results: Result[];
    categories: Category[];
    filters: Filter[];
    category_results?: any;
}

@Injectable()
export class ZakazUaProvider implements IProviderService {

    static hasSearch = true;
    static get id() {
        return 'zakaz-ua';
    }

    async pull() {
        return this.search(process.env.ZAKAZ_UA_BUCKWHEAT_SEARCH_STRING);
    }

    async search(q: string) {
        const res: Array<ISearchResult> = [] 
        const stores = await getRepository(Store).find({
            where: {
                providerId: ZakazUaProvider.id
            }
        })
        for(const store of stores) {
            const storeProducts = await this._search(q, store).then(r => r.results);
            for(const storeProduct of storeProducts) {
                res.push({
                    storeExternalId: store.externalId,
                    producer: {
                        externalId: storeProduct.producer.trademark_slug,
                        name: storeProduct.producer.trademark,
                        imageURL: storeProduct.producer.logo?.s64x64,
                    },
                    title: storeProduct.title,
                    currency: storeProduct.currency as Currency,
                    unit: storeProduct.unit as Unit,
                    webURL: storeProduct.web_url,
                    weight: storeProduct.weight,
                    description: storeProduct.description,
                    imageURL: storeProduct.img.s350x350,
                    price: storeProduct.price,
                    externalId: storeProduct.sku,
                })
            }
        }
        return res;
    }

    private async _search(q: string, store: Partial<Store>): Promise<RootObject> {
        return fetch(utf8.encode(`${process.env.ZAKAZ_UA_API_URL}/stores/${store.externalId}/products/search/?q=${q}`), {
            "headers": {
                "accept": "*/*",
                "accept-language": "ru",
                "cache-control": "no-cache",
                "content-type": "application/json",
                "pragma": "no-cache",
                "sec-ch-ua": "\"Google Chrome\";v=\"87\", \" Not;A Brand\";v=\"99\", \"Chromium\";v=\"87\"",
                "sec-ch-ua-mobile": "?0",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-site",
                "x-chain": store.xChain,
                "x-delivery-type": "undefined",
                "x-version": "29"
            },
            "body": null,
            "method": "GET",
            //@ts-ignore
            "mode": "cors",
            "credentials": "include"
        })
        .then(res =>res.json())

    }

}