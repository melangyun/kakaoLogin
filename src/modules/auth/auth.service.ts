import { Injectable,HttpException, HttpStatus } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../user/user.entity";
import { KaKao } from "./kakao.entity";
import { SignUpDTO } from "./auth.dto";
import * as bcrypt from "bcryptjs";
import { SanitizeUser } from "../../type/user.type";
import { Payload } from "../../type/payload.type";
import { sign } from "jsonwebtoken"

@Injectable()
export class AuthService{
    constructor(
        @InjectRepository(User)
        private userRepository : Repository<User>,

        @InjectRepository(KaKao)
        private kaKaoRepository : Repository<KaKao>,
    ){}

    // 유저 비밀번호 삭제
    private sanitizeUser( user : User ): SanitizeUser {
        delete user.password;
        delete user.isActive;
        return user;
    }

    // 회원가입
    async create(signUpDTO : SignUpDTO):Promise<SanitizeUser>{
        const { email, phone, password, nickname } = signUpDTO;
        const userArray:User[] = await this.userRepository.find({
            where : [
                { email }, { phone } 
            ]
        });

        if( userArray[0] && ( userArray[0].email === email )){
            throw new HttpException("Email already exists", HttpStatus.FORBIDDEN);
        } 
        else if( userArray[0] && ( userArray[0].email !== email )){
            throw new HttpException("Already existed phone number", HttpStatus.FORBIDDEN);
        }

        const hashedPw = await bcrypt.hash(password, 10);
        const registerUser: User = await this.userRepository.save( { email, phone, password : hashedPw , nickname } );
        
        return this.sanitizeUser(registerUser);
    }

    // 로그인!
    async findByLogin(email:string, password:string){
        const user:User = await this.userRepository.findOne({email});
        
        if(!user){
            throw new HttpException("Invalid credential", HttpStatus.UNAUTHORIZED );
        }

        if( !user.isActive ){
            throw new HttpException('Unable to access deleted member.', HttpStatus.FORBIDDEN );
        }
        
        if( await bcrypt.compare(password, user.password)){
            return this.sanitizeUser(user);
        }

        throw new HttpException("Invalid credential", HttpStatus.UNAUTHORIZED );
    }

    // JWT 발급
    async signPayload(payload:Payload){
        const secret:string = process.env.JWT_SECRET_ACCESS;
        return sign( payload, secret, {expiresIn: "1d"} );
    }

    async verifyUser(email:string):Promise<SanitizeUser>{
        const user:User = await this.userRepository.findOne({email});
        if( !user ){
            throw new HttpException("Invalid user", HttpStatus.NOT_FOUND);
        }
        
        if( !user.isActive ){
            throw new HttpException('Unable to access deleted member.', HttpStatus.FORBIDDEN );
        }
        
        return this.sanitizeUser(user);
    }
    
}