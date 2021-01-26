import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Producer {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    externalId: string;

    @Column({ nullable: true })
    name: string;

    @Column({ nullable: true })
    imageURL: string;

}