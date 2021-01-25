import { Repository } from "typeorm";
import { PositionHistory } from "../../entities";

export type IPullResultItem = Omit<PositionHistory, "createdAt" | "id" | "position" | "positionId"> & {
    externalId: any;
    title: string;
    imageUrl: string;
    webUrl: string;
}

type IPullResult = Array<IPullResultItem>; 

export interface IPositionProvider {
    pull(): Promise<IPullResult>;
}