/* eslint-disable @typescript-eslint/camelcase */
import { Controller, Post, Body, Get, Query, HttpStatus, HttpException } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SanitizeUser } from "../../type/user.type";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { Payload, KakaoTokenData } from "../../type/payload.type";
import axios from 'axios';
import * as qs from "qs";

@ApiTags("auth")
@Controller("auth")
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post("signup")
    async signUp(@Body() signUpDTO:SignUpDTO):Promise<SanitizeUser>{
        const user:SanitizeUser = await this.authService.create(signUpDTO);
        return user;
    }
    
    @Post("login")
    async login(@Body() loginDTO:LoginDTO) : Promise<{payload:Payload , token:string}>{
        const { email , password } = loginDTO;
        const user:SanitizeUser = await this.authService.findByLogin(email, password);
        const payload = {
            email : user.email,
            nickname : user.nickname
        }

        const token:string = await this.authService.signPayload(payload);
        return { payload, token };
    }

    @Get("kakao/code")
    async kakaoGetCode(@Query() query){
        const { code } = query;

        const url = "https://kauth.kakao.com/oauth/token";
        const data = {
            grant_type : "authorization_code",
            client_id : process.env.KAKAOAPPKEY,
            redirect_uri : process.env.KAKAOREDIRECTURI,
            code
        }
        const axiosConfig = {
            headers : { "Content-type" : "application/x-www-form-urlencoded;charset=utf-8" }
        };

        const tokenData:KakaoTokenData = await axios.post(url, qs.stringify(data), axiosConfig)
            .then(res => res.data)
            .catch(err => {
                console.error(err);
                throw new HttpException("KaKao Server Exception", HttpStatus.INTERNAL_SERVER_ERROR);
            });
        
        const kakaoInfo:any = await axios.get("https://kapi.kakao.com/v2/user/me",{
                    headers : { 
                        "Authorization" : `Bearer ${tokenData.access_token}`,
                        "Content-type" : "application/x-www-form-urlencoded;charset=utf-8"
                    }
                    
            })
            .then(res => res.data);
         
        const result = { 
            kakaoAccessToken : tokenData.access_token,
            kakaoRefreshToken : tokenData.refresh_token,
            userEmail : kakaoInfo.kakao_account.email
        }
    
        return result;
    }
    
    @Get("kakao")
    async kakaoAuth(){
        const appKey:string = process.env.KAKAOAPPKEY;
        const redirectUri:string = process.env.KAKAOREDIRECTURI;
        return `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectUri}&response_type=code`;
    }


}