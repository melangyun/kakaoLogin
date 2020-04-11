import { Entity, OneToOne, Column } from "typeorm";
import { User } from "../user/user.entity";

@Entity()
export class Kakao{
    @OneToOne( type => User, { primary : true, cascade:true })
    user: User;

    @Column({type:"varchar", nullable:true})
    accessToken:string;

    @Column({type:"varchar", nullable:true})
    refreshToken:string;
    
}