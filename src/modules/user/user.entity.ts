import { Entity, PrimaryColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { KaKao } from "../auth/kakao.entity";

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
    
    @Column( {type:"boolean", name :"is_active", nullable: false, default:true})
    isActive!: boolean;

    @CreateDateColumn({ name: "create_at" })
    createAt! : Date;

    @UpdateDateColumn({ name: "update_at" })
    updateAt! : Date;

    @OneToOne( type => KaKao, { cascade : true})
    @JoinColumn()
    kakao!: KaKao;
}