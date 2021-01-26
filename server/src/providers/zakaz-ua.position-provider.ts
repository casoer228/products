import { Position } from "../entities";
import { IPositionProvider, IPullResultItem } from "./abstract/position-provider.interface";
import fetch from "node-fetch";
import { Injectable } from "@nestjs/common";
import * as utf8 from 'utf8';


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
export class ZakazUaPositionsProvider implements IPositionProvider {

    static hasSearch = true;

    async pull() {
        return this.search(process.env.ZAKAZ_UA_BUCKWHEAT_SEARCH_STRING);
    }

    async search(q: string): Promise<Array<IPullResultItem>> {
        const results: Array<IPullResultItem> = [];
        const searchResponse = await this._search(q)
        for (const response of searchResponse) {
            for (const product of response.results) {
                results.push({
                    externalId: product.sku,
                    imageUrl: product.img.s350x350,
                    price: product.price,
                    title: product.title,
                    webUrl: product.web_url,
                })
            }
        }
        return results;
    }

    private async _search(q: string): Promise<Array<RootObject>>
    private async _search(q: string, storeId?: number): Promise<[RootObject]> {
        if (!storeId) {
            //@ts-ignore
            return Promise.all(process.env.ZAKAZ_UA_STORES_IDS.split(',').map(Number.parseInt).map(storeId => this._search(q, storeId).then(res => res[0])))
        }
        return fetch(utf8.encode(`${process.env.ZAKAZ_UA_API_URL}/stores/${storeId}/products/search/?q=${q}`), {
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
                "x-chain": "metro",
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
        .then(res => [res])

    }

}