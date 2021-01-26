import { ApiProperty, ApiResponseProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNumber, IsPositive, IsEmpty } from "class-validator";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Position } from "./position.entity";

const { CREATE } = CrudValidationGroups;

@Entity('positions-history')
export class PositionHistory {

    @ApiProperty({
        readOnly: true,
    })
    @IsNumber()
    @IsPositive()
    @IsEmpty({ groups: [CREATE] })
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({ type: Position })
    @ManyToOne(() => Position, p => p.history)
    position: Position;

    @Column()
    positionId: number;

    @ApiProperty({
        readOnly: true,
    })
    // @CreateDateColumn()
    @Column({ type: 'date', nullable: true })
    createdAt: Date;

    @Column()
    price: number;

}