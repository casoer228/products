import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Store } from "./store.entity";

export enum Currency {
    UAH = 'uah',
}

export enum Unit {
    Kilogram = "gr",
    Gram = "kg",
    Pieces = "pcs",
}

@Entity()
export class Product {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    externalId: string;

    @Column({ nullable: true })
    description: string;

    @Column({ type: "float", nullable: true })
    weight: number;

    @Column({ enum: Unit, type: 'enum'})
    unit: Unit;

    @Column({ nullable: true })
    count: number;

    @ManyToOne(() => Store, i => i.products)
    store: Store;

    @Column()
    storeId: number;

    @Column({ enum: Currency, type: 'enum'})
    currency: Currency;

    @Column()
    price: number;

    @Column({ nullable: true })
    imageURL: string;

    @Column()
    webURL: string;



}