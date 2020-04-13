import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, IsDefined, Matches, IsNumber } from "class-validator";

// class-validator 메소드 모음 : https://www.npmjs.com/package/class-validator
export class SignUpDTO{
    @ApiProperty({
        description : "The Email for login (unique)",
        type: String,
    })
    @IsEmail()
    @IsDefined()
    readonly email: string;

    @ApiProperty({
        description : "The phone number",
        type: String
    })
    @IsString()
    @IsDefined()
    @Matches( /^\d{3}-\d{3,4}-\d{4}$/)
    readonly phone:string;

    @ApiProperty({
        description : "The PW you want",
        type: String,
    })
    @IsString()
    @IsDefined()
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,16}/)
    readonly password: string;

    @ApiProperty({
        description : "The nickname you want",
        type: String,
    })
    @IsString()
    @IsDefined()
    readonly nickname: string;

    @ApiProperty({
        description: "Kakao AccessToken",
        type: String||null,
        nullable:true
    })
    readonly kakaoAccessToken?: string|null;

    @ApiProperty({
        description: "Kakao RefreshToken",
        type: String||null,
        nullable:true
    })
    readonly kakaoRefreshToken?: string|null;

    @ApiProperty({
        description : "kakao userId",
        type: Number,
    })
    readonly userId?: number|null;
}

export class LoginDTO{
    @ApiProperty({
        description : "User Email",
        type: String,
    })
    @IsEmail()
    @IsString()
    @IsDefined()
    readonly email: string;

    @ApiProperty({
        description : "User PW",
        type: String,
    })
    readonly password : string;
}

export class KakaoInfoDTO{
    @ApiProperty({
        description : "kakao AccessToken",
        type: String,
    })
    @IsString()
    @IsDefined()
    readonly kakaoAccessToken: string;

    @ApiProperty({
        description : "kakao RefreshToken",
        type: String,
    })
    @IsString()
    @IsDefined()
    readonly kakaoRefreshToken: string;

    @ApiProperty({
        description : "kakao userId",
        type: Number,
    })
    @IsNumber()
    @IsDefined()
    readonly userId: number;
}