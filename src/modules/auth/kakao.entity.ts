import { Entity, OneToOne, Column, JoinColumn } from "typeorm";
import { User } from "../user/user.entity";

@Entity({name:"kakao"})
export class KaKao{
    @OneToOne( type => User, { primary : true , cascade : true})
    @JoinColumn()
    user: User;
    
    @Column({type:"varchar", nullable:true})
    accessToken!:string;
    
    @Column({type:"varchar", nullable:true})
    refreshToken!:string;
    
}