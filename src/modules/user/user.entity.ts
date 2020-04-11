import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn()
    email: string;

    @Column({type:"varchar", nullable:false})
    password!: string;

    @Column({type:"varchar", nullable:false, unique:true})
    phone!: string;

    @Column({type:"varchar", nullable:false})
    nickname!: string;

    @CreateDateColumn({ name: "create_at" })
    createAt! : Date;

    @UpdateDateColumn({ name: "update_at" })
    updateAt! : Date;
}