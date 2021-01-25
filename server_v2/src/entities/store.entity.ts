import { Column, Entity } from "typeorm";
import { EntityListenerMetadata } from "typeorm/metadata/EntityListenerMetadata";

@Entity()
export class Store {

    @Column()
    title: string;

    @Column()
    iconUrl: string;

    

}