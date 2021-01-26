import { ApiProperty } from "@nestjs/swagger";
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsEmpty, IsNumber, IsPositive, IsString, IsUrl } from "class-validator";
import { AfterLoad, Column, Entity, getRepository, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PositionHistory } from "./position-history.entity";

const { CREATE } = CrudValidationGroups;

@Entity("positions")
export class Position {

    @ApiProperty({
        readOnly: true,
    })
    @IsNumber()
    @IsPositive()
    @IsEmpty({ groups: [CREATE] })
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ApiProperty()
    @IsString()
    @Column()
    provider: string;

    @ApiProperty({
        readOnly: true,
    })
    @IsNumber()
    @IsPositive()
    @Column()
    providerPositionId: string;

    @ApiProperty({
        type: PositionHistory,
        isArray: true,
        readOnly: true,
    })
    @OneToMany(() => PositionHistory, p => p.position)
    history: Array<PositionHistory>;

    @ApiProperty({
        readOnly: true
    })
    @Column()
    price: number;

    @ApiProperty()
    @IsUrl()
    @Column()
    imageUrl: string;

    @ApiProperty({ readOnly: true })
    @IsString()
    @Column()
    webUrl: string;

}