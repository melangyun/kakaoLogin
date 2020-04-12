/* eslint-disable @typescript-eslint/camelcase */
import { Controller, Post, Body, Get, Query, UseGuards } from "@nestjs/common";
import { ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SanitizeUser } from "../../type/user.type";
import { LoginDTO, SignUpDTO, KakaoInfoDTO } from "./auth.dto";
import { Payload, KakaoTokenData } from "../../type/payload.type";
import { AuthUser } from "src/utilities/user.decorator";
import { AuthGuard } from "@nestjs/passport";

@ApiTags("auth")
@Controller("auth")
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post("signup")
    async signUp(@Body() signUpDTO:SignUpDTO):Promise<SanitizeUser>{
        const user:SanitizeUser = await this.authService.create(signUpDTO);

        const { email, kakaoAccessToken , kakaoRefreshToken } = signUpDTO;
        if( kakaoAccessToken && kakaoRefreshToken ){
            await this.authService.saveKakaoAuth(email, kakaoAccessToken, kakaoRefreshToken);
        }

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
    async kakaoGetCode(@Query() query):Promise<object>{
        // 카카오에서 redirect해주는는 url
        const { code } = query;
        const tokenData:KakaoTokenData = await this.authService.getKakaoToken(code);
        const kakaoInfo:any = await this.authService.getKaKaoUserInfo(tokenData.access_token)
         
        return { 
            kakaoAccessToken : tokenData.access_token,
            kakaoRefreshToken : tokenData.refresh_token,
            userEmail : kakaoInfo.kakao_account.email
        }
    }
    
    @Get("kakao")
    async kakaoAuth(){
        // 카카오 코드 발급
        const appKey:string = process.env.KAKAOAPPKEY;
        const redirectUri:string = process.env.KAKAOREDIRECTURI;
        return `https://kauth.kakao.com/oauth/authorize?client_id=${appKey}&redirect_uri=${redirectUri}&response_type=code`;
    }

    @Post("kakao")
    @ApiBearerAuth()
    @UseGuards(AuthGuard('jwt'))
    async addKakaoAuth(@Body() kakaoInfoDTO:KakaoInfoDTO, @AuthUser() authUser:SanitizeUser){
        // 추후 계정 연동
        const {kakaoAccessToken, kakaoRefreshToken }= kakaoInfoDTO;
        const { email } = authUser;
        await this.authService.saveKakaoAuth(email, kakaoAccessToken, kakaoRefreshToken );
        return "Success in adding Kakao account";
    }

}