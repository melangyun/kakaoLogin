import { KaKao } from "../auth/kakao.entity";

export interface SanitizeUser{
    email:string;
    phone:string;
    nickname:string;
    createAt:Date;
    updateAt:Date;
    kakao?:KaKao;
}