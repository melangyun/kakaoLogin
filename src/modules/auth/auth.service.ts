import { Injectable, Inject } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { KaKao } from "./kakao.entity";

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,

        @InjectRepository(KaKao)
        private kaKaoRepository : Repository<KaKao>,
    ){}
    
}