import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: "packages"
})
export class Packages {
    /**
     * Primary generated column, type uuid
     */
    @PrimaryGeneratedColumn('uuid')
    id:string

    /**
     * Package type, not nullable
     */
    @Column({
        type: "varchar",
        nullable: false,
    })
    type: string

    /**
     * Package width, not nullable, type int
     */
    @Column({
        type: "int",
        nullable: false,
    })
    width: number

    /**
     * Package height, not nullable, type int
     */
    @Column({
        type: "int",
        nullable: false,
    })
    height: number

    /**
     * Package length, not nullable, type int
     */
    @Column({
        type: "int",
        nullable: false,
    })
    length: number

    /**
     * Package weigth, not nullable, type int
     */
    @Column({
        type: "int",
        nullable: false
    })
    weigth: number

    /**
     * Package price, not nullable, type int
     */
    @Column({
        type: "int",
        nullable: false,
    })
    package_price: number
}