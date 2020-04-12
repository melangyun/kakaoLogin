import { KaKao } from "../modules/auth/kakao.entity";

export interface SanitizeUser{
    email:string;
    phone:string;
    nickname:string;
    createAt:Date;
    updateAt:Date;
    kakao?:KaKao;
}