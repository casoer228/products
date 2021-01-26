import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { EntityListenerMetadata } from "typeorm/metadata/EntityListenerMetadata";
import { Product } from "./product.entity";
import { Provider } from "./provider.entity";

@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    externalId: string;

    @Column()
    title: string;

    @Column()
    iconUrl: string;

    @ManyToOne(() => Provider, i => i.stores)
    provider: Provider;

    @Column()
    providerId: string;

    @OneToMany(() => Product, i => i.store)
    products: Array<Product>;

    @Column()
    xChain: string;

}