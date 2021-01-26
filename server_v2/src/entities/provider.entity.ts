import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Store } from "./store.entity";

@Entity()
export class Provider {

    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @OneToMany(() => Store, i => i.provider)
    stores: Array<Store>;

}