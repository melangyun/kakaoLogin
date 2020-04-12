import { Controller, Post, Body } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SanitizeUser } from "../../type/user.type";
import { LoginDTO, SignUpDTO } from "./auth.dto";
import { Payload } from "../../type/payload.type";

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


}