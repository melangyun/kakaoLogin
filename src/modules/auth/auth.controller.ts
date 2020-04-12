import { Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AuthService } from "./auth.service";
import { SanitizeUser } from "../user/user.type";
import { LoginDTO, SignUpDTO } from "./auth.dto";

@ApiTags("auth")
@Controller("auth")
export class AuthController{
    constructor(
        private readonly authService: AuthService,
    ){}

    @Post()
    async signUp(signUpDTO:SignUpDTO){
        const user:SanitizeUser = await this.authService.create(signUpDTO);
        return user;
    }
    
    @Post("login")
    async login(loginDTO:LoginDTO){
        const { email , password } = loginDTO;
        const user:SanitizeUser = await this.authService.findByLogin(email, password);

    }


}