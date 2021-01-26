import { Producer, Product } from "../../entities";

export type ISearchResult = Partial<Product> &  {
    producer: Partial<Producer>,
    storeExternalId: string;
}

export interface IProviderService {
    search(s: string): Promise<Array<ISearchResult>>; 
}