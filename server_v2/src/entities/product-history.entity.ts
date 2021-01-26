import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductHistory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    productId: number;

    @ManyToOne(() => Product)
    product: Product;

    @Column({ type: 'date' })
    createdAt: Date;

    @Column()
    price: number;
}